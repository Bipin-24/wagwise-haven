import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, ErrorState, LoadingState, PageHero, Section } from "@/components/ui-kit";
import { useAuth } from "@/hooks/use-auth";
import {
  addVaccination,
  getPet,
  getPetDocumentSignedUrl,
  getPetDocuments,
  getPetPhotoSignedUrl,
  getPetVaccinations,
  uploadPetDocument,
} from "@/services/api";
import type { CustomerPet, PetDocument, PetVaccination } from "@/types/customer-pets";
import { cn } from "@/lib/utils";

const title = "Pet Profile — Paw Brothers";

export const Route = createFileRoute("/my-pets/$petId")({
  head: () => ({ meta: [{ title }] }),
  component: PetDetailPage,
});

const field =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

function isOverdue(nextDueOn: string | null) {
  if (!nextDueOn) return false;
  return new Date(nextDueOn) < new Date();
}

function PetDetailPage() {
  const { petId } = Route.useParams();
  const { loading: authLoading, user } = useAuth();

  const [pet, setPet] = useState<CustomerPet | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [vaccinations, setVaccinations] = useState<PetVaccination[]>([]);
  const [documents, setDocuments] = useState<PetDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [vaccineDraft, setVaccineDraft] = useState({ vaccineName: "", givenOn: "", nextDueOn: "" });
  const [documentType, setDocumentType] = useState("vaccination_certificate");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [petData, vaccinationData, documentData] = await Promise.all([
        getPet(petId),
        getPetVaccinations(petId),
        getPetDocuments(petId),
      ]);
      if (!petData) {
        setNotFound(true);
        return;
      }
      setPet(petData);
      setVaccinations(vaccinationData);
      setDocuments(documentData);
      if (petData.photo_path) {
        setPhotoUrl(await getPetPhotoSignedUrl(petData.photo_path));
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, petId]);

  const addVaccineRecord = async () => {
    if (!vaccineDraft.vaccineName.trim() || !vaccineDraft.givenOn) {
      toast.error("Add a vaccine name and date given.");
      return;
    }
    try {
      await addVaccination(petId, vaccineDraft);
      setVaccineDraft({ vaccineName: "", givenOn: "", nextDueOn: "" });
      toast.success("Vaccination added.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add vaccination.");
    }
  };

  const uploadDocument = async (file: File | undefined) => {
    if (!file || !user) return;
    setUploading(true);
    try {
      await uploadPetDocument(user.id, petId, file, documentType);
      toast.success("Document uploaded.");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not upload document.");
    } finally {
      setUploading(false);
    }
  };

  const viewDocument = async (doc: PetDocument) => {
    try {
      const url = await getPetDocumentSignedUrl(doc.storage_path);
      window.open(url, "_blank", "noreferrer");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not open document.");
    }
  };

  if (authLoading || !user || loading) {
    return (
      <Section className="pt-0">
        <LoadingState />
      </Section>
    );
  }

  if (notFound || !pet) {
    return (
      <Section className="pt-0">
        <ErrorState message="Pet not found." />
      </Section>
    );
  }

  return (
    <>
      <PageHero eyebrow="My Pets" title={pet.name} {...(pet.breed ? { sub: pet.breed } : {})} />
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Card className="p-6">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={pet.name}
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="grid aspect-square place-items-center rounded-2xl bg-secondary text-4xl">
                🐾
              </div>
            )}
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Age</dt>
                <dd>{pet.age_years ?? "—"} yrs</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Weight</dt>
                <dd>{pet.weight_kg ?? "—"} kg</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Gender</dt>
                <dd className="capitalize">{pet.gender}</dd>
              </div>
            </dl>
            {pet.notes && <p className="mt-4 text-sm text-muted-foreground">{pet.notes}</p>}
          </Card>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="font-display text-xl font-bold">Vaccinations</h2>
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
                onClick={() => void addVaccineRecord()}
                className="mt-3 rounded-full border border-input px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Add vaccination
              </button>

              {vaccinations.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No vaccinations recorded yet.</p>
              ) : (
                <ul className="mt-4 space-y-2 text-sm">
                  {vaccinations.map((v) => (
                    <li
                      key={v.id}
                      className="flex items-center justify-between rounded-xl bg-secondary px-4 py-2"
                    >
                      <span>
                        {v.vaccine_name} — given {v.given_on}
                        {v.next_due_on ? `, next due ${v.next_due_on}` : ""}
                      </span>
                      {isOverdue(v.next_due_on) && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                          Overdue
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-xl font-bold">Documents</h2>
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
                  disabled={uploading}
                  onChange={(e) => void uploadDocument(e.target.files?.[0])}
                  className="text-sm"
                />
              </div>

              {documents.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">No documents uploaded yet.</p>
              ) : (
                <ul className="mt-4 space-y-2 text-sm">
                  {documents.map((d) => (
                    <li
                      key={d.id}
                      className="flex items-center justify-between rounded-xl bg-secondary px-4 py-2"
                    >
                      <span>
                        {d.file_name}{" "}
                        <span className="text-muted-foreground">({d.document_type})</span>
                      </span>
                      <button
                        onClick={() => void viewDocument(d)}
                        className="font-semibold text-primary"
                      >
                        View
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
