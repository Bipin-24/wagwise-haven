/**
 * API-shaped access layer. Every function currently resolves mock data;
 * swap the bodies for real network calls later without touching the UI.
 */
import {
  bookings,
  documents,
  dogActivities,
  dogs,
  facility,
  foodProducts,
  groomingAppointments,
  medicalRecords,
  medications,
  nutritionPlans,
  owner,
  pricingPlans,
  rooms,
  sampleReviews,
  services,
  trainingPrograms,
  trainingSessions,
  vaccinations,
  vets,
} from "@/data/mock";
import type { WaitlistEntry } from "@/types";
import type { CustomerPet, PetDocument, PetVaccination } from "@/types/customer-pets";
import { supabase } from "@/lib/supabase";

export const getDogs = () => dogs;
export const getDog = (slugOrId: string) =>
  dogs.find((d) => d.slug === slugOrId || d.id === slugOrId);
export const getOwner = () => owner;

export const getServices = () => services;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getPricing = (slug: string) => pricingPlans.filter((p) => p.serviceSlug === slug);

export const getBookings = () => bookings;
export const getBookingsForDog = (dogId: string) => bookings.filter((b) => b.dogId === dogId);
export type BookingRequest = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  dog: string;
  service: string;
  start: string;
  end: string;
  notes: Record<string, string>;
};

export type StoredBookingRequest = {
  id: string;
  created_at: string;
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

export const createBooking = async (draft: BookingRequest) => {
  if (!supabase) {
    throw new Error(
      "Booking requests are not configured yet. Please contact Paw Brothers directly.",
    );
  }

  const { data, error } = await supabase.from("booking_requests").insert({
    customer_name: draft.customerName,
    customer_email: draft.customerEmail,
    customer_phone: draft.customerPhone,
    dog_name: draft.dog,
    service_slug: draft.service,
    requested_start_date: draft.start || null,
    requested_end_date: draft.end || null,
    care_preferences: draft.notes,
  });

  if (error) throw error;
  return data;
};

export const getBookingRequests = async () => {
  if (!supabase) throw new Error("Booking requests are not configured.");
  const { data, error } = await supabase
    .from("booking_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as StoredBookingRequest[];
};

export const updateBookingRequestStatus = async (
  id: string,
  status: StoredBookingRequest["status"],
) => {
  if (!supabase) throw new Error("Booking requests are not configured.");
  const { error } = await supabase.from("booking_requests").update({ status }).eq("id", id);
  if (error) throw error;
};

export const getAvailability = () => rooms;
export const getFacilityAvailability = () => rooms;
export const getFacility = () => facility;

export const getDogHealthRecords = (dogId: string) => ({
  vaccinations: vaccinations.filter((v) => v.dogId === dogId),
  records: medicalRecords.filter((r) => r.dogId === dogId),
  medications: medications.filter((m) => m.dogId === dogId),
});
export const getDogNutrition = (dogId: string) => nutritionPlans.find((n) => n.dogId === dogId);
export const getDogTraining = (dogId: string) => trainingSessions.filter((t) => t.dogId === dogId);
export const getDogGrooming = (dogId: string) =>
  groomingAppointments.filter((g) => g.dogId === dogId);
export const getDogDocuments = (dogId: string) => documents.filter((d) => d.dogId === dogId);
export const getDogActivities = (dogId: string) => dogActivities.filter((a) => a.dogId === dogId);

export const getTrainingPrograms = () => trainingPrograms;
export const getFoodProducts = () => foodProducts;
export const getVets = () => vets;
export const getReviews = () => sampleReviews;

export const joinWaitlist = async (entry: WaitlistEntry) => {
  if (!supabase)
    throw new Error("Visit requests are not configured yet. Please contact Paw Brothers directly.");
  const { error } = await supabase.from("visit_requests").insert({
    customer_name: entry.name,
    customer_email: entry.email,
    customer_phone: entry.phone,
    dog_name: entry.dogName || null,
    breed: entry.breed || null,
    dog_age: entry.age || null,
    area: entry.area || null,
    interests: entry.interests,
  });
  if (error) throw error;
  return { ok: true };
};

export type PetDraft = {
  name: string;
  breed?: string | undefined;
  ageYears?: number | undefined;
  weightKg?: number | undefined;
  gender: CustomerPet["gender"];
  notes?: string | undefined;
};

const PET_DOCUMENTS_BUCKET = "pet-documents";

export const createPet = async (ownerUserId: string, draft: PetDraft) => {
  if (!supabase)
    throw new Error("Pet profiles are not configured yet. Please contact Paw Brothers directly.");
  const { data, error } = await supabase
    .from("pets")
    .insert({
      owner_user_id: ownerUserId,
      name: draft.name,
      breed: draft.breed || null,
      age_years: draft.ageYears ?? null,
      weight_kg: draft.weightKg ?? null,
      gender: draft.gender,
      notes: draft.notes || null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as CustomerPet;
};

export const getMyPets = async () => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as CustomerPet[];
};

export const getPet = async (petId: string) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { data, error } = await supabase.from("pets").select("*").eq("id", petId).maybeSingle();
  if (error) throw error;
  return data as CustomerPet | null;
};

export const updatePetPhoto = async (petId: string, storagePath: string) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { error } = await supabase.from("pets").update({ photo_path: storagePath }).eq("id", petId);
  if (error) throw error;
};

export const uploadPetPhoto = async (ownerUserId: string, petId: string, file: File) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const path = `${ownerUserId}/${petId}/photo-${crypto.randomUUID()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(PET_DOCUMENTS_BUCKET)
    .upload(path, file);
  if (uploadError) throw uploadError;
  await updatePetPhoto(petId, path);
  return path;
};

export const addVaccination = async (
  petId: string,
  vaccine: { vaccineName: string; givenOn: string; nextDueOn?: string },
) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { data, error } = await supabase
    .from("pet_vaccinations")
    .insert({
      pet_id: petId,
      vaccine_name: vaccine.vaccineName,
      given_on: vaccine.givenOn,
      next_due_on: vaccine.nextDueOn || null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as PetVaccination;
};

export const getPetVaccinations = async (petId: string) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { data, error } = await supabase
    .from("pet_vaccinations")
    .select("*")
    .eq("pet_id", petId)
    .order("given_on", { ascending: false });
  if (error) throw error;
  return data as PetVaccination[];
};

export const uploadPetDocument = async (
  ownerUserId: string,
  petId: string,
  file: File,
  documentType: string,
) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const path = `${ownerUserId}/${petId}/${crypto.randomUUID()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(PET_DOCUMENTS_BUCKET)
    .upload(path, file);
  if (uploadError) throw uploadError;

  const { data, error } = await supabase
    .from("pet_documents")
    .insert({
      pet_id: petId,
      file_name: file.name,
      storage_path: path,
      mime_type: file.type || null,
      size_bytes: file.size,
      document_type: documentType || null,
    })
    .select("*")
    .single();

  if (error) {
    try {
      await supabase.storage.from(PET_DOCUMENTS_BUCKET).remove([path]);
    } catch {
      // best-effort cleanup; the original insert error is what matters
    }
    throw error;
  }

  return data as PetDocument;
};

export const getPetDocuments = async (petId: string) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { data, error } = await supabase
    .from("pet_documents")
    .select("*")
    .eq("pet_id", petId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as PetDocument[];
};

export const getPetDocumentSignedUrl = async (storagePath: string) => {
  if (!supabase) throw new Error("Pet profiles are not configured.");
  const { data, error } = await supabase.storage
    .from(PET_DOCUMENTS_BUCKET)
    .createSignedUrl(storagePath, 300);
  if (error) throw error;
  return data.signedUrl;
};

export const getPetPhotoSignedUrl = async (storagePath: string) => {
  return getPetDocumentSignedUrl(storagePath);
};
