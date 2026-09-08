import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Card, LoadingState, PageHero, Section } from "@/components/ui-kit";
import { useAuth } from "@/hooks/use-auth";
import {
  addVaccination,
  createPet,
  uploadPetDocument,
  uploadPetPhoto,
  type PetDraft,
} from "@/services/api";
import { cn } from "@/lib/utils";

const title = "Add a Pet — Paw Brothers";

export const Route = createFileRoute("/my-pets/new")({
  head: () => ({ meta: [{ title }] }),
  component: NewPetPage,
});

const steps = ["Pet details", "Photo", "Vaccinations", "Documents", "Review", "Done"];
const field =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

type DraftVaccination = { vaccineName: string; givenOn: string; nextDueOn: string };
type DraftDocument = { file: File; documentType: string };

function NewPetPage() {
  const { loading, user } = useAuth();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [createdPetId, setCreatedPetId] = useState<string | null>(null);
  const [partialFailure, setPartialFailure] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    breed: "",
    ageYears: "",
    weightKg: "",
    gender: "unknown" as PetDraft["gender"],
    notes: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [vaccinations, setVaccinations] = useState<DraftVaccination[]>([]);
  const [vaccineDraft, setVaccineDraft] = useState<DraftVaccination>({
    vaccineName: "",
    givenOn: "",
    nextDueOn: "",
  });
  const [documents, setDocuments] = useState<DraftDocument[]>([]);
  const [documentType, setDocumentType] = useState("vaccination_certificate");

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-3 py-1.5 text-xs font-semibold",
      active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
    );

  const addVaccineDraft = () => {
    if (!vaccineDraft.vaccineName.trim() || !vaccineDraft.givenOn) {
      toast.error("Add a vaccine name and date given.");
      return;
    }
    setVaccinations((prev) => [...prev, vaccineDraft]);
    setVaccineDraft({ vaccineName: "", givenOn: "", nextDueOn: "" });
  };

  const addDocumentDraft = (file: File | undefined) => {
    if (!file) return;
    setDocuments((prev) => [...prev, { file, documentType }]);
  };

  const submit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const pet = await createPet(user.id, {
        name: details.name.trim(),
        breed: details.breed.trim() || undefined,
        ageYears: details.ageYears ? Number(details.ageYears) : undefined,
        weightKg: details.weightKg ? Number(details.weightKg) : undefined,
        gender: details.gender,
        notes: details.notes.trim() || undefined,
      });
      setCreatedPetId(pet.id);

      let failed = false;
      try {
        if (photoFile) await uploadPetPhoto(user.id, pet.id, photoFile);
        for (const v of vaccinations) await addVaccination(pet.id, v);
        for (const d of documents) await uploadPetDocument(user.id, pet.id, d.file, d.documentType);
      } catch {
        failed = true;
      }

      setPartialFailure(failed);
      toast[failed ? "error" : "success"](
        failed
          ? "Pet was created, but some records failed to save. You can add them from the pet's page."
          : "Pet profile created.",
      );
      setStep(5);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not create the pet profile.");
    } finally {
      setSubmitting(false);
    }
  };

  const continueWizard = () => {
    if (step === 0 && !details.name.trim()) {
      toast.error("Add your pet's name.");
      return;
    }
    if (step === 4) {
      void submit();
      return;
    }
    setStep(step + 1);
  };

  if (loading || !user) {
    return (
      <Section className="pt-0">
        <LoadingState />
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="My Pets"
        title="Add a pet."
        sub="Tell us about your dog, add vaccinations and upload documents."
      />
      <Section className="pt-0">
        <Card className="mx-auto max-w-3xl p-8">
          <ol className="mb-8 flex flex-wrap gap-2">
            {steps.map((s, i) => (
              <li key={s} className={pill(i === step)}>
                {i + 1}. {s}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Pet's name"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                className={cn(field, "sm:col-span-2")}
              />
              <input
                placeholder="Breed"
                value={details.breed}
                onChange={(e) => setDetails({ ...details, breed: e.target.value })}
                className={field}
              />
              <select
                value={details.gender}
                onChange={(e) =>
                  setDetails({ ...details, gender: e.target.value as PetDraft["gender"] })
                }
                className={field}
              >
                <option value="unknown">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                placeholder="Age (years)"
                value={details.ageYears}
                onChange={(e) => setDetails({ ...details, ageYears: e.target.value })}
                className={field}
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={details.weightKg}
                onChange={(e) => setDetails({ ...details, weightKg: e.target.value })}
                className={field}
              />
              <input
                placeholder="Notes (optional)"
                value={details.notes}
                onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                className={cn(field, "sm:col-span-2")}
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display text-xl font-bold">Add a photo (optional)</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                className="mt-4 text-sm"
              />
              {photoFile && <p className="mt-2 text-sm text-muted-foreground">{photoFile.name}</p>}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-xl font-bold">Vaccinations (optional)</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <input
                  placeholder="Vaccine name"
                  value={vaccineDraft.vaccineName}
                  onChange={(e) =>
                    setVaccineDraft({ ...vaccineDraft, vaccineName: e.target.value })
                  }
                  className={field}
                />
                <label className="text-xs text-muted-foreground">
                  Given on
                  <input
                    type="date"
                    value={vaccineDraft.givenOn}
                    onChange={(e) => setVaccineDraft({ ...vaccineDraft, givenOn: e.target.value })}
                    className={cn(field, "mt-1")}
                  />
                </label>
                <label className="text-xs text-muted-foreground">
                  Next due
                  <input
                    type="date"
                    value={vaccineDraft.nextDueOn}
                    onChange={(e) =>
                      setVaccineDraft({ ...vaccineDraft, nextDueOn: e.target.value })
                    }
                    className={cn(field, "mt-1")}
                  />
                </label>
              </div>
              <button
                onClick={addVaccineDraft}
                className="mt-3 rounded-full border border-input px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Add vaccination
              </button>
              {vaccinations.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm">
                  {vaccinations.map((v, i) => (
                    <li key={i} className="rounded-xl bg-secondary px-4 py-2">
                      {v.vaccineName} — given {v.givenOn}
                      {v.nextDueOn ? `, next due ${v.nextDueOn}` : ""}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-xl font-bold">Documents (optional)</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className={field}
                >
                  <option value="vaccination_certificate">Vaccination certificate</option>
                  <option value="medical_record">Medical record</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="file"
                  onChange={(e) => addDocumentDraft(e.target.files?.[0])}
                  className="text-sm"
                />
              </div>
              {documents.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm">
                  {documents.map((d, i) => (
                    <li key={i} className="rounded-xl bg-secondary px-4 py-2">
                      {d.file.name} ({d.documentType})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-xl font-bold">Review</h2>
              <dl className="mt-5 space-y-3 text-sm">
                {[
                  ["Name", details.name],
                  ["Breed", details.breed || "Not set"],
                  ["Age", details.ageYears ? `${details.ageYears} yrs` : "Not set"],
                  ["Weight", details.weightKg ? `${details.weightKg} kg` : "Not set"],
                  ["Photo", photoFile ? photoFile.name : "None"],
                  [
                    "Vaccinations",
                    vaccinations.length ? `${vaccinations.length} added` : "None added",
                  ],
                  ["Documents", documents.length ? `${documents.length} added` : "None added"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-border pb-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {step === 5 && (
            <div className="py-10 text-center">
              <p className="text-4xl">{partialFailure ? "⚠️" : "🐾"}</p>
              <h2 className="mt-4 font-display text-3xl font-bold">
                {partialFailure ? "Pet created, with some issues" : "Pet profile created"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {partialFailure
                  ? "Your pet was saved, but some vaccinations or documents failed to upload. You can add them from the pet's page."
                  : "You can view and update your pet's profile anytime."}
              </p>
              {createdPetId && (
                <Link
                  to="/my-pets/$petId"
                  params={{ petId: createdPetId }}
                  className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  View pet profile
                </Link>
              )}
            </div>
          )}

          {step < 5 && (
            <div className="mt-8 flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
                >
                  Back
                </button>
              )}
              <button
                onClick={continueWizard}
                disabled={submitting}
                className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
              >
                {step === 4 ? (submitting ? "Saving…" : "Create pet profile") : "Continue"}
              </button>
            </div>
          )}
        </Card>
      </Section>
    </>
  );
}
