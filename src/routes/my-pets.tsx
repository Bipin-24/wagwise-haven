import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, LoadingState, PageHero, Section } from "@/components/ui-kit";
import { useAuth } from "@/hooks/use-auth";

const title = "My Pets — Paw Brothers";
const description = "Manage your dog's profile, vaccination history and documents.";

export const Route = createFileRoute("/my-pets")({
  head: () => ({
    meta: [{ title }, { name: "description", content: description }],
  }),
  component: MyPetsLayout,
});

function MyPetsLayout() {
  const { session, loading, signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const signIn = async () => {
    setSending(true);
    const { error } = await signInWithEmail(email, "/my-pets");
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Check your email for the sign-in link.");
  };

  if (loading) {
    return (
      <Section className="pt-0">
        <LoadingState />
      </Section>
    );
  }

  if (!session) {
    return (
      <>
        <PageHero
          eyebrow="My Pets"
          title="Manage your dog's profile."
          sub="Sign in with your email to add your pet, log vaccinations and store documents."
        />
        <Section className="pt-0">
          <Card className="mx-auto max-w-md p-8">
            <label className="text-sm font-semibold" htmlFor="pet-owner-email">
              Your email
            </label>
            <input
              id="pet-owner-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="you@example.com"
            />
            <button
              onClick={() => void signIn()}
              disabled={!email || sending}
              className="mt-5 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              Send sign-in link
            </button>
          </Card>
        </Section>
      </>
    );
  }

  return <Outlet />;
}
