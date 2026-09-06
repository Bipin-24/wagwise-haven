/**
 * Domain models for Paw Brothers.
 * These describe the future backend entities. For now every value is served
 * from mock data in `src/data`, through the API-shaped helpers in `src/services`.
 */

export type ID = string;

export type ServiceStatus = "available" | "coming-soon" | "planned";

export interface ServiceCategory {
  id: ID;
  name: string;
  slug: string;
}

export interface Service {
  id: ID;
  slug: string;
  name: string;
  emoji: string;
  categoryId: ID;
  tagline: string;
  description: string;
  status: ServiceStatus;
  heroImage: string;
  cardImage: string;
  features: string[];
  ctaLabel: string;
}

export interface PricingPlan {
  id: ID;
  serviceSlug: string;
  name: string;
  price: number;
  unit: string;
  note: string;
  includes: string[];
  highlighted?: boolean;
}

export interface Breed {
  id: ID;
  name: string;
}

export interface Owner {
  id: ID;
  name: string;
  email: string;
  phone: string;
  area: string;
  dogIds: ID[];
}

export interface Dog {
  id: ID;
  slug: string;
  name: string;
  breed: string;
  persona: string;
  age: string;
  weightKg: number;
  gender: "Male" | "Female";
  ownerId: ID;
  photo: string;
  gallery: string[];
  about: string;
  personality: string[];
  favourites: string[];
  routine: { time: string; emoji: string; label: string }[];
  healthStatus: "Healthy" | "Under observation" | "Recovering";
}

export interface Vaccination {
  id: ID;
  dogId: ID;
  name: string;
  givenOn: string;
  nextDue: string;
}

export interface MedicalRecord {
  id: ID;
  dogId: ID;
  date: string;
  title: string;
  detail: string;
  type: "check-up" | "vaccination" | "grooming" | "note";
}

export interface Medication {
  id: ID;
  dogId: ID;
  name: string;
  dose: string;
  schedule: string;
}

export interface NutritionPlan {
  dogId: ID;
  currentFood: string;
  schedule: { time: string; meal: string }[];
  preferences: string[];
  treats: string[];
  sensitivities: string[];
  notes: string;
}

export interface TrainingProgram {
  id: ID;
  name: string;
  level: string;
  weeks: number;
  sessions: number;
  trainer: string;
  price: number;
  summary: string;
}

export interface TrainingSession {
  id: ID;
  dogId: ID;
  programId: ID;
  date: string;
  focus: string;
  completed: boolean;
}

export interface GroomingAppointment {
  id: ID;
  dogId: ID;
  service: string;
  date: string;
  status: BookingStatus;
}

export interface FoodProduct {
  id: ID;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  status: ServiceStatus;
}

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Booking {
  id: ID;
  dogId: ID;
  serviceSlug: string;
  serviceName: string;
  startDate: string;
  endDate?: string;
  nights?: number;
  status: BookingStatus;
  estimate: number;
  careNotes?: string;
}

export interface BoardingStay {
  id: ID;
  bookingId: ID;
  roomId: ID;
  checkIn: string;
  checkOut: string;
}

export interface Room {
  id: ID;
  name: string;
  type: string;
  status: "available" | "reserved" | "occupied" | "maintenance";
  dogName?: string;
}

export interface Facility {
  id: ID;
  city: string;
  status: "planned" | "operational";
  areas: { emoji: string; name: string; detail: string; status: ServiceStatus }[];
}

export interface DogActivity {
  id: ID;
  dogId: ID;
  emoji: string;
  label: string;
  time: string;
  done: boolean;
  photo?: string;
  note?: string;
}

export interface Vet {
  id: ID;
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export interface Staff {
  id: ID;
  name: string;
  role: string;
}

export interface Review {
  id: ID;
  quote: string;
  author: string;
  context: string;
  sample: true;
}

export interface WaitlistEntry {
  name: string;
  phone: string;
  email: string;
  dogName: string;
  breed: string;
  age: string;
  area: string;
  interests: string[];
}

export interface Notification {
  id: ID;
  title: string;
  body: string;
  time: string;
}

export interface DocumentRecord {
  id: ID;
  dogId: ID;
  name: string;
  type: string;
  uploadedOn: string;
}

export interface Order {
  id: ID;
  ownerId: ID;
  items: { productId: ID; qty: number }[];
  total: number;
  status: "draft" | "placed" | "delivered";
}

export interface Payment {
  id: ID;
  bookingId: ID;
  amount: number;
  status: "pending" | "paid" | "refunded";
}
