import { useState } from "react";
import { toast } from "sonner";
import { joinWaitlist } from "@/services/api";
import { cn } from "@/lib/utils";

const interests = ["Boarding", "Daycare", "Training", "Grooming", "Veterinary", "Food"];

const field =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function WaitlistForm() {
  const [selected, setSelected] = useState<string[]>(["Boarding"]);
  const [done, setDone] = useState(false);

  const toggle = (i: string) =>
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  if (done) {
    return (
      <div className="rounded-3xl bg-primary-soft p-10 text-center">
        <p className="text-3xl">❤️</p>
        <h3 className="mt-3 font-display text-2xl font-bold">You're on the list</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you — we'll be in touch as Paw Brothers opens in Pune.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        await joinWaitlist({
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          dogName: String(data.get("dogName") ?? ""),
          breed: String(data.get("breed") ?? ""),
          age: String(data.get("age") ?? ""),
          area: String(data.get("area") ?? ""),
          interests: selected,
        });
        toast.success("Added to the Paw Brothers waitlist");
        setDone(true);
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <input required name="name" placeholder="Your name" className={field} />
      <input required name="phone" placeholder="Phone" className={field} />
      <input required type="email" name="email" placeholder="Email" className={field} />
      <input name="dogName" placeholder="Dog's name" className={field} />
      <input name="breed" placeholder="Breed" className={field} />
      <input name="age" placeholder="Age" className={field} />
      <input name="area" placeholder="Area in Pune" className={cn(field, "sm:col-span-2")} />

      <div className="sm:col-span-2">
        <p className="mb-3 text-sm font-semibold">Services you're interested in</p>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selected.includes(i)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/75 hover:bg-muted",
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:col-span-2"
      >
        Join the Paw Brothers Waitlist
      </button>
    </form>
  );
}
