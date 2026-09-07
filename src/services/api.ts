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
    throw new Error("Booking requests are not configured yet. Please contact Paw Brothers directly.");
  }

  const { data, error } = await supabase
    .from("booking_requests")
    .insert({
      customer_name: draft.customerName,
      customer_email: draft.customerEmail,
      customer_phone: draft.customerPhone,
      dog_name: draft.dog,
      service_slug: draft.service,
      requested_start_date: draft.start || null,
      requested_end_date: draft.end || null,
      care_preferences: draft.notes,
    })

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
  // Mock submission — stored in memory only for this phase.
  return { ok: true, entry };
};
