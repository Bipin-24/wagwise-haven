type BookingRequest = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  dog_name: string;
  service_slug: string;
  requested_start_date: string | null;
  requested_end_date: string | null;
  care_preferences: Record<string, string>;
  status: "pending" | "confirmed" | "declined" | "cancelled";
};

type DatabaseWebhookPayload = {
  record?: BookingRequest;
  old_record?: BookingRequest;
  visit_request?: VisitRequest;
};

type VisitRequest = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  dog_name: string | null;
  breed: string | null;
  dog_age: string | null;
  area: string | null;
  interests: string[];
};

const required = (name: string) => {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
};

const formatPreferences = (preferences: Record<string, string>) =>
  Object.entries(preferences)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n") || "None provided";

const sendEmail = async ({
  to,
  replyTo,
  subject,
  text,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}) => {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${required("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: required("RESEND_FROM_EMAIL"),
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
    }),
  });

  if (!response.ok) throw new Error(`Resend rejected notification: ${await response.text()}`);
};

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    if (request.headers.get("x-webhook-secret") !== required("BOOKING_WEBHOOK_SECRET")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = (await request.json()) as DatabaseWebhookPayload;
    const visit = payload.visit_request;
    if (visit) {
      await sendEmail({
        to: required("BOOKING_NOTIFICATION_EMAIL"),
        replyTo: visit.customer_email,
        subject: `New free visit request from ${visit.customer_name}`,
        text: [
          "A new Paw Brothers free visit request has arrived.",
          "",
          `Customer: ${visit.customer_name}`,
          `Email: ${visit.customer_email}`,
          `Phone: ${visit.customer_phone}`,
          `Dog: ${visit.dog_name ?? "Not provided"}`,
          `Breed: ${visit.breed ?? "Not provided"}`,
          `Age: ${visit.dog_age ?? "Not provided"}`,
          `Area: ${visit.area ?? "Not provided"}`,
          `Interested in: ${visit.interests.join(", ") || "Not provided"}`,
        ].join("\n"),
      });
      return new Response("Visit notification sent", { status: 200 });
    }

    const booking = payload.record;
    if (!booking) return new Response("Booking record missing", { status: 400 });

    if (!payload.old_record) {
      await sendEmail({
        to: required("BOOKING_NOTIFICATION_EMAIL"),
        replyTo: booking.customer_email,
        subject: `New ${booking.service_slug} booking request for ${booking.dog_name}`,
        text: [
          "A new Paw Brothers booking request has arrived.",
          "",
          `Customer: ${booking.customer_name}`,
          `Email: ${booking.customer_email}`,
          `Phone: ${booking.customer_phone}`,
          `Dog: ${booking.dog_name}`,
          `Service: ${booking.service_slug}`,
          `Dates: ${booking.requested_start_date ?? "To confirm"} to ${booking.requested_end_date ?? "To confirm"}`,
          "",
          "Care preferences:",
          formatPreferences(booking.care_preferences),
        ].join("\n"),
      });
    } else if (booking.status === "confirmed" && payload.old_record.status !== "confirmed") {
      await sendEmail({
        to: booking.customer_email,
        subject: `Your Paw Brothers booking for ${booking.dog_name} is confirmed`,
        text: [
          `Hi ${booking.customer_name},`,
          "",
          `Your ${booking.service_slug} booking for ${booking.dog_name} is confirmed.`,
          `Dates: ${booking.requested_start_date ?? "To be confirmed"} to ${booking.requested_end_date ?? "To be confirmed"}`,
          "",
          "We will be in touch shortly with arrival details. We look forward to welcoming your dog to Paw Brothers.",
        ].join("\n"),
      });
    }

    return new Response("Notification sent", { status: 200 });
  } catch (error) {
    console.error("Booking notification failed", error);
    return new Response("Notification failed", { status: 500 });
  }
});
