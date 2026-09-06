import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Card, PageHero, Section } from "@/components/ui-kit";

const title = "Contact Paw Brothers — Pune";
const description = "Get in touch with Paw Brothers in Pune about boarding, daycare, training, grooming and more.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://wagwise-haven.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://wagwise-haven.lovable.app/contact" }],
  }),
  component: ContactPage,
});

const field =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to Paw Brothers." sub="Questions about care, the facility or working together — we'd love to hear from you." />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Card className="h-fit p-8">
            <h2 className="font-display text-xl font-bold">Paw Brothers</h2>
            <p className="mt-2 text-sm text-muted-foreground">Pune, Maharashtra</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-semibold">Coming soon</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-semibold">Coming soon</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Social</dt>
                <dd className="font-semibold">Instagram · Facebook — coming soon</dd>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Send us your real email, phone and area and we'll put them here.
            </p>
          </Card>

          <Card className="p-8">
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Thanks — your message has been recorded.");
                e.currentTarget.reset();
              }}
            >
              <input required name="name" placeholder="Name" className={field} />
              <input required type="email" name="email" placeholder="Email" className={field} />
              <input name="phone" placeholder="Phone" className={field} />
              <input name="dogName" placeholder="Dog's name" className={field} />
              <textarea required name="message" placeholder="Message" rows={5} className={`${field} sm:col-span-2`} />
              <button className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground sm:col-span-2">
                Contact Paw Brothers
              </button>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
