import { createFileRoute } from "@tanstack/react-router";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, PageHero, Section } from "@/components/ui-kit";
import {
  getBookingRequests,
  type StoredBookingRequest,
  updateBookingRequestStatus,
} from "@/services/api";
import { supabase } from "@/lib/supabase";

const title = "Owner Dashboard — Paw Brothers";
const description = "Secure booking management for Paw Brothers.";
const statuses = ["pending", "confirmed", "declined", "cancelled"] as const;

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/dashboard" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/dashboard" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState<StoredBookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      setRequests(await getBookingRequests());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load booking requests.");
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) void loadRequests();
  }, [session]);

  const signIn = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Check your email for the secure sign-in link.");
  };

  const changeStatus = async (id: string, status: StoredBookingRequest["status"]) => {
    try {
      await updateBookingRequestStatus(id, status);
      await loadRequests();
      toast.success("Booking status updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update booking status.");
    }
  };

  if (!session) {
    return (
      <>
        <PageHero eyebrow="Owner access" title="Paw Brothers booking desk." sub="Use an approved owner email to receive a secure sign-in link." />
        <Section className="pt-0">
          <Card className="mx-auto max-w-md p-8">
            <label className="text-sm font-semibold" htmlFor="owner-email">Owner email</label>
            <input
              id="owner-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="you@example.com"
            />
            <button onClick={signIn} disabled={!email || loading} className="mt-5 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
              Send secure sign-in link
            </button>
          </Card>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Owner dashboard" title="Booking requests." sub={`Signed in as ${session.user.email}`} />
      <Section className="pt-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{requests.length} requests received</p>
          <button onClick={() => void loadRequests()} className="rounded-full border border-input px-4 py-2 text-sm font-semibold hover:bg-secondary">Refresh</button>
        </div>
        <div className="grid gap-5">
          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-bold">{request.dog_name} · {request.service_slug}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{request.customer_name} · {request.customer_phone} · {request.customer_email}</p>
                  <p className="mt-3 text-sm">{request.requested_start_date ?? "Date to confirm"} to {request.requested_end_date ?? "Date to confirm"}</p>
                </div>
                <select value={request.status} onChange={(event) => void changeStatus(request.id, event.target.value as StoredBookingRequest["status"])} className="rounded-full border border-input bg-background px-4 py-2 text-sm font-semibold capitalize">
                  {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              {Object.values(request.care_preferences).some(Boolean) && <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">{Object.entries(request.care_preferences).filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join(" · ")}</p>}
            </Card>
          ))}
          {!loading && requests.length === 0 && <Card className="p-8 text-center text-sm text-muted-foreground">No booking requests yet.</Card>}
        </div>
      </Section>
    </>
  );
}
