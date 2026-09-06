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

export const getDogs = () => dogs;
export const getDog = (slugOrId: string) =>
  dogs.find((d) => d.slug === slugOrId || d.id === slugOrId);
export const getOwner = () => owner;

export const getServices = () => services;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getPricing = (slug: string) => pricingPlans.filter((p) => p.serviceSlug === slug);

export const getBookings = () => bookings;
export const getBookingsForDog = (dogId: string) => bookings.filter((b) => b.dogId === dogId);
export const createBooking = async (draft: Record<string, unknown>) => {
  // Mock submission — replaced by a real API call later.
  return { id: `bk_${Date.now()}`, ...draft };
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
  // Mock submission — stored in memory only for this phase.
  return { ok: true, entry };
};
