import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, EmptyState, LoadingState, PageHero, Section } from "@/components/ui-kit";
import { useAuth } from "@/hooks/use-auth";
import { getMyPets, getPetPhotoSignedUrl } from "@/services/api";
import type { CustomerPet } from "@/types/customer-pets";

export const Route = createFileRoute("/my-pets/")({
  component: MyPetsIndexPage,
});

function PetThumbnail({ pet }: { pet: CustomerPet }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!pet.photo_path) return;
    getPetPhotoSignedUrl(pet.photo_path)
      .then(setUrl)
      .catch(() => setUrl(null));
  }, [pet.photo_path]);

  if (!url) {
    return (
      <div className="grid aspect-square place-items-center rounded-2xl bg-secondary text-3xl">
        🐾
      </div>
    );
  }
  return <img src={url} alt={pet.name} className="aspect-square w-full rounded-2xl object-cover" />;
}

function MyPetsIndexPage() {
  const { session, signOut } = useAuth();
  const [pets, setPets] = useState<CustomerPet[]>([]);
  const [petsLoading, setPetsLoading] = useState(true);

  const loadPets = async () => {
    setPetsLoading(true);
    try {
      setPets(await getMyPets());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load your pets.");
    } finally {
      setPetsLoading(false);
    }
  };

  useEffect(() => {
    void loadPets();
  }, []);

  return (
    <>
      <PageHero eyebrow="My Pets" title="Your pets." sub={`Signed in as ${session?.user.email}`} />
      <Section className="pt-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {pets.length} pet{pets.length === 1 ? "" : "s"}
          </p>
          <div className="flex gap-3">
            <Link
              to="/my-pets/new"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Add a pet
            </Link>
            <button
              onClick={() => void signOut()}
              className="rounded-full border border-input px-4 py-2 text-sm font-semibold hover:bg-secondary"
            >
              Sign out
            </button>
          </div>
        </div>

        {petsLoading ? (
          <LoadingState />
        ) : pets.length === 0 ? (
          <EmptyState
            title="No pets yet"
            body="Add your first pet to start tracking vaccinations and documents."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <Link key={pet.id} to="/my-pets/$petId" params={{ petId: pet.id }}>
                <Card hover className="p-5">
                  <PetThumbnail pet={pet} />
                  <p className="mt-4 font-display text-lg font-bold">{pet.name}</p>
                  <p className="text-sm text-muted-foreground">{pet.breed || "Breed not set"}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
