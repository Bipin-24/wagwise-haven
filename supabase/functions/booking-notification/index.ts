type BookingRequest = {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  dog_name: string;
  service_slug: string;
  requested_start_date: string | null;
  requested_end_date: string | null;
  care_preferences: Record<string, string>;
};

type DatabaseWebhookPayload = {
  record?: BookingRequest;
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

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    if (request.headers.get("x-webhook-secret") !== required("BOOKING_WEBHOOK_SECRET")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = (await request.json()) as DatabaseWebhookPayload;
    const booking = payload.record;
    if (!booking) return new Response("Booking record missing", { status: 400 });

    const subject = `New ${booking.service_slug} booking request for ${booking.dog_name}`;
    const text = [
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
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${required("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: required("RESEND_FROM_EMAIL"),
        to: [required("BOOKING_NOTIFICATION_EMAIL")],
        reply_to: booking.customer_email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected booking notification", await response.text());
      return new Response("Email notification failed", { status: 502 });
    }

    return new Response("Notification sent", { status: 200 });
  } catch (error) {
    console.error("Booking notification failed", error);
    return new Response("Notification failed", { status: 500 });
  }
});