import { img } from "./images";
import type {
  Booking,
  Dog,
  DogActivity,
  DocumentRecord,
  Facility,
  FoodProduct,
  GroomingAppointment,
  MedicalRecord,
  Medication,
  NutritionPlan,
  Owner,
  PricingPlan,
  Review,
  Room,
  Service,
  Staff,
  TrainingProgram,
  TrainingSession,
  Vaccination,
  Vet,
} from "@/types";

export const brand = {
  name: "Paw Brothers",
  tagline: "Built by dog parents, for dog parents.",
  message: "Because every dog deserves family-level care.",
  city: "Pune, Maharashtra",
  status: "Pune • Coming Soon",
};

export const owner: Owner = {
  id: "own_1",
  name: "Bipin",
  email: "",
  phone: "",
  area: "Pune",
  dogIds: ["dog_bruno", "dog_goofy"],
};

export const dogs: Dog[] = [
  {
    id: "dog_bruno",
    slug: "bruno",
    name: "Bruno",
    breed: "German Shepherd",
    persona: "The Protector",
    age: "3 years",
    weightKg: 32,
    gender: "Male",
    ownerId: "own_1",
    photo: img.brunoSit,
    gallery: [img.brunoSit, img.brunoSofa, img.brunoBalcony, img.brunoRest, img.brothers],
    about:
      "Smart, loyal, energetic and always watching over his family. Bruno learns fast, notices everything and takes his job as house supervisor very seriously.",
    personality: ["Intelligent", "Loyal", "Protective", "Energetic", "Confident", "Curious"],
    favourites: ["Long evening walks", "Balcony watch duty", "Puzzle games", "Fetch in open grounds"],
    routine: [
      { time: "06:45", emoji: "🌅", label: "Morning walk" },
      { time: "08:00", emoji: "🥣", label: "Breakfast" },
      { time: "11:00", emoji: "🧠", label: "Training & enrichment" },
      { time: "14:00", emoji: "😴", label: "Rest" },
      { time: "18:30", emoji: "🌳", label: "Evening walk" },
      { time: "20:00", emoji: "🥣", label: "Dinner" },
    ],
    healthStatus: "Healthy",
  },
  {
    id: "dog_goofy",
    slug: "goofy",
    name: "Goofy",
    breed: "Golden Retriever",
    persona: "The Heart",
    age: "2 years",
    weightKg: 28,
    gender: "Male",
    ownerId: "own_1",
    photo: img.goofyGarden,
    gallery: [img.goofyGarden, img.goofyTree, img.goofyParent, img.brothers],
    about:
      "Playful, loving and convinced everyone is his best friend. Goofy greets the world tail-first and turns every walk into a social event.",
    personality: ["Friendly", "Loving", "Playful", "Gentle", "Happy", "Social"],
    favourites: ["Grass and sunshine", "Meeting new people", "Water play", "Carrying his leash"],
    routine: [
      { time: "07:00", emoji: "🌅", label: "Morning walk" },
      { time: "08:15", emoji: "🥣", label: "Breakfast" },
      { time: "10:30", emoji: "🐕", label: "Play & socialisation" },
      { time: "13:30", emoji: "😴", label: "Rest" },
      { time: "17:00", emoji: "🎓", label: "Training games" },
      { time: "20:00", emoji: "🥣", label: "Dinner" },
    ],
    healthStatus: "Healthy",
  },
];

export const services: Service[] = [
  {
    id: "svc_boarding",
    slug: "boarding",
    name: "Boarding",
    emoji: "🏡",
    categoryId: "cat_care",
    tagline: "Your dog's second home while you're away.",
    description:
      "Comfortable stays with supervised care, exercise, feeding to your instructions and daily updates so you always know how your dog is doing.",
    status: "coming-soon",
    heroImage: img.boarding,
    cardImage: img.boarding,
    features: [
      "Comfortable stay",
      "Exercise",
      "Feeding according to instructions",
      "Supervised care",
      "Daily updates",
      "Individual care preferences",
    ],
    ctaLabel: "Explore Boarding",
  },
  {
    id: "svc_daycare",
    slug: "daycare",
    name: "Daycare",
    emoji: "🐕",
    categoryId: "cat_care",
    tagline: "A safe place to play, socialize and relax.",
    description:
      "Structured play, quiet rest time and supervision through the day for dogs whose humans are at work.",
    status: "coming-soon",
    heroImage: img.daycare,
    cardImage: img.daycare,
    features: ["Supervised play", "Rest periods", "Socialisation groups", "Feeding on your schedule", "Pick-up and drop-off windows", "End-of-day summary"],
    ctaLabel: "Explore Daycare",
  },
  {
    id: "svc_training",
    slug: "training",
    name: "Training",
    emoji: "🎓",
    categoryId: "cat_learning",
    tagline: "Better communication. Better habits. Stronger bonds.",
    description:
      "Reward-based programmes shaped around your dog's age, breed and personality — and around the humans they live with.",
    status: "coming-soon",
    heroImage: img.training,
    cardImage: img.training,
    features: ["Puppy training", "Obedience", "Behaviour", "Socialization", "Advanced training", "Progress notes"],
    ctaLabel: "Explore Training",
  },
  {
    id: "svc_veterinary",
    slug: "veterinary",
    name: "Veterinary Support",
    emoji: "🩺",
    categoryId: "cat_wellness",
    tagline: "Professional veterinary expertise at the heart of responsible care.",
    description:
      "Veterinary knowledge guides how we plan care, keep records and respond to health questions.",
    status: "coming-soon",
    heroImage: img.vet,
    cardImage: img.vet,
    features: ["General consultation", "Preventive care", "Health guidance", "Medical record review", "Follow-up care"],
    ctaLabel: "Learn More",
  },
  {
    id: "svc_grooming",
    slug: "grooming",
    name: "Grooming",
    emoji: "✂️",
    categoryId: "cat_wellness",
    tagline: "Gentle, thoughtful grooming for happy dogs.",
    description:
      "Low-stress grooming at a pace your dog is comfortable with — bath, brush, coat, nails and ears.",
    status: "coming-soon",
    heroImage: img.grooming,
    cardImage: img.grooming,
    features: ["Bath", "Brush", "Coat care", "Nail care", "Ear cleaning", "Calm handling"],
    ctaLabel: "Explore Grooming",
  },
  {
    id: "svc_food",
    slug: "food",
    name: "Natural Food",
    emoji: "🌿",
    categoryId: "cat_nutrition",
    tagline: "Thoughtfully selected food and nutrition options.",
    description:
      "A carefully chosen range of meals, treats and nutrition products for dogs at every life stage.",
    status: "coming-soon",
    heroImage: img.food,
    cardImage: img.food,
    features: ["Natural meals", "Treats", "Healthy snacks", "Puppy food", "Adult food", "Nutrition products"],
    ctaLabel: "Explore Food",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan_day",
    serviceSlug: "boarding",
    name: "Day Stay",
    price: 700,
    unit: "day",
    note: "Demo pricing — final pricing coming soon",
    includes: ["Supervised care", "Two walks", "Feeding as instructed", "Photo update"],
  },
  {
    id: "plan_night",
    serviceSlug: "boarding",
    name: "Overnight Stay",
    price: 1100,
    unit: "night",
    note: "Demo pricing — final pricing coming soon",
    includes: ["Comfortable rest area", "Three walks", "Feeding as instructed", "Daily updates", "Individual care plan"],
    highlighted: true,
  },
  {
    id: "plan_week",
    serviceSlug: "boarding",
    name: "Extended Stay",
    price: 6800,
    unit: "week",
    note: "Demo pricing — final pricing coming soon",
    includes: ["Everything in Overnight", "Weekly grooming touch-up", "Enrichment sessions", "Detailed stay report"],
  },
  {
    id: "plan_daycare",
    serviceSlug: "daycare",
    name: "Full Day",
    price: 600,
    unit: "day",
    note: "Demo pricing — final pricing coming soon",
    includes: ["Supervised play", "Rest time", "Meal service", "Day summary"],
    highlighted: true,
  },
  {
    id: "plan_daycare_half",
    serviceSlug: "daycare",
    name: "Half Day",
    price: 350,
    unit: "half day",
    note: "Demo pricing — final pricing coming soon",
    includes: ["Supervised play", "Rest time", "Day summary"],
  },
];

export const trainingPrograms: TrainingProgram[] = [
  { id: "tp_puppy", name: "Puppy Training", level: "For 8–20 week pups", weeks: 4, sessions: 6, trainer: "Paw Brothers Trainer", price: 6000, summary: "Toilet training, bite inhibition, crate comfort and gentle early socialisation." },
  { id: "tp_obedience", name: "Basic Obedience", level: "Everyday manners", weeks: 6, sessions: 8, trainer: "Paw Brothers Trainer", price: 9000, summary: "Sit, stay, recall, loose-leash walking and calm greetings." },
  { id: "tp_behaviour", name: "Behaviour Training", level: "For challenging behaviour", weeks: 8, sessions: 10, trainer: "Paw Brothers Trainer", price: 13000, summary: "Reactivity, separation distress, resource guarding and confidence building." },
  { id: "tp_social", name: "Socialization", level: "Small groups", weeks: 4, sessions: 4, trainer: "Paw Brothers Trainer", price: 5000, summary: "Calm, structured introductions to dogs, people and busy environments." },
  { id: "tp_advanced", name: "Advanced Training", level: "Next level skills", weeks: 10, sessions: 12, trainer: "Paw Brothers Trainer", price: 16000, summary: "Off-leash reliability, scent games, tricks and canine sport foundations." },
];

export const trainingSessions: TrainingSession[] = [
  { id: "ts_1", dogId: "dog_bruno", programId: "tp_obedience", date: "2026-08-12", focus: "Loose-leash walking", completed: true },
  { id: "ts_2", dogId: "dog_bruno", programId: "tp_obedience", date: "2026-08-19", focus: "Recall in the garden", completed: true },
  { id: "ts_3", dogId: "dog_bruno", programId: "tp_obedience", date: "2026-08-26", focus: "Settle on mat", completed: true },
  { id: "ts_4", dogId: "dog_bruno", programId: "tp_obedience", date: "2026-09-02", focus: "Door greetings", completed: true },
  { id: "ts_5", dogId: "dog_bruno", programId: "tp_obedience", date: "2026-09-09", focus: "Distraction work", completed: false },
  { id: "ts_6", dogId: "dog_goofy", programId: "tp_social", date: "2026-09-07", focus: "Calm greetings", completed: true },
  { id: "ts_7", dogId: "dog_goofy", programId: "tp_social", date: "2026-09-14", focus: "Group play manners", completed: false },
];

export const vaccinations: Vaccination[] = [
  { id: "vac_1", dogId: "dog_bruno", name: "Anti-rabies", givenOn: "2026-07-04", nextDue: "2027-07-04" },
  { id: "vac_2", dogId: "dog_bruno", name: "DHPPi booster", givenOn: "2026-03-18", nextDue: "2027-03-18" },
  { id: "vac_3", dogId: "dog_goofy", name: "Anti-rabies", givenOn: "2026-05-22", nextDue: "2027-05-22" },
  { id: "vac_4", dogId: "dog_goofy", name: "DHPPi booster", givenOn: "2026-02-10", nextDue: "2027-02-10" },
];

export const medicalRecords: MedicalRecord[] = [
  { id: "mr_1", dogId: "dog_bruno", date: "September 2026", title: "Routine check", detail: "General wellness check. Weight stable at 32 kg.", type: "check-up" },
  { id: "mr_2", dogId: "dog_bruno", date: "August 2026", title: "Grooming", detail: "Full coat brush-out, nail trim and ear clean.", type: "grooming" },
  { id: "mr_3", dogId: "dog_bruno", date: "July 2026", title: "Vaccination", detail: "Anti-rabies administered, next due July 2027.", type: "vaccination" },
  { id: "mr_4", dogId: "dog_goofy", date: "September 2026", title: "Routine check", detail: "Coat and skin review, all clear.", type: "check-up" },
  { id: "mr_5", dogId: "dog_goofy", date: "June 2026", title: "Grooming", detail: "Bath, blow-dry and de-shed.", type: "grooming" },
  { id: "mr_6", dogId: "dog_goofy", date: "May 2026", title: "Vaccination", detail: "Anti-rabies administered, next due May 2027.", type: "vaccination" },
];

export const medications: Medication[] = [
  { id: "med_1", dogId: "dog_bruno", name: "Joint supplement", dose: "1 chew", schedule: "Daily with breakfast" },
  { id: "med_2", dogId: "dog_goofy", name: "Tick & flea preventive", dose: "As advised", schedule: "Monthly" },
];

export const nutritionPlans: NutritionPlan[] = [
  {
    dogId: "dog_bruno",
    currentFood: "Home-cooked chicken, rice and vegetables",
    schedule: [
      { time: "08:00", meal: "Breakfast — 400 g" },
      { time: "20:00", meal: "Dinner — 400 g" },
    ],
    preferences: ["Prefers warm food", "Eats slowly from a flat bowl"],
    treats: ["Dried chicken strips", "Carrot sticks"],
    sensitivities: ["Avoid chicken liver"],
    notes: "Water topped up four times a day.",
  },
  {
    dogId: "dog_goofy",
    currentFood: "Balanced kibble with fresh toppers",
    schedule: [
      { time: "08:15", meal: "Breakfast — 350 g" },
      { time: "20:00", meal: "Dinner — 350 g" },
    ],
    preferences: ["Eats fast — uses a slow-feeder bowl"],
    treats: ["Training biscuits", "Frozen curd cubes"],
    sensitivities: ["None recorded"],
    notes: "Loves food, so portions are measured carefully.",
  },
];

export const bookings: Booking[] = [
  { id: "bk_1", dogId: "dog_bruno", serviceSlug: "boarding", serviceName: "Boarding", startDate: "12 Oct 2026", endDate: "18 Oct 2026", nights: 6, status: "confirmed", estimate: 6600, careNotes: "Two measured meals, joint supplement with breakfast." },
  { id: "bk_2", dogId: "dog_goofy", serviceSlug: "training", serviceName: "Training — Socialization", startDate: "Tomorrow, 5:00 pm", status: "confirmed", estimate: 1250 },
  { id: "bk_3", dogId: "dog_goofy", serviceSlug: "grooming", serviceName: "Grooming", startDate: "24 Sep 2026, 11:00 am", status: "pending", estimate: 900 },
  { id: "bk_4", dogId: "dog_bruno", serviceSlug: "daycare", serviceName: "Daycare", startDate: "2 Sep 2026", status: "completed", estimate: 600 },
  { id: "bk_5", dogId: "dog_goofy", serviceSlug: "daycare", serviceName: "Daycare", startDate: "18 Aug 2026", status: "cancelled", estimate: 600 },
];

export const groomingAppointments: GroomingAppointment[] = [
  { id: "ga_1", dogId: "dog_goofy", service: "Bath & brush", date: "24 Sep 2026", status: "pending" },
  { id: "ga_2", dogId: "dog_bruno", service: "Coat & nail care", date: "12 Aug 2026", status: "completed" },
];

export const dogActivities: DogActivity[] = [
  { id: "act_1", dogId: "dog_bruno", emoji: "🌅", label: "Morning walk", time: "7:05 am", done: true, note: "Two rounds of the park, plenty of sniffing." },
  { id: "act_2", dogId: "dog_bruno", emoji: "🥣", label: "Breakfast", time: "8:10 am", done: true, note: "Finished the full bowl." },
  { id: "act_3", dogId: "dog_bruno", emoji: "🐕", label: "Playtime", time: "10:40 am", done: true, photo: img.brunoBalcony },
  { id: "act_4", dogId: "dog_bruno", emoji: "😴", label: "Rest", time: "1:30 pm", done: true },
  { id: "act_5", dogId: "dog_bruno", emoji: "📸", label: "New photo", time: "2 hours ago", done: true, photo: img.brunoSofa, note: "Bruno is doing great today ❤️" },
  { id: "act_6", dogId: "dog_bruno", emoji: "🌳", label: "Evening walk", time: "6:30 pm", done: false },
  { id: "act_7", dogId: "dog_goofy", emoji: "🌅", label: "Morning walk", time: "7:15 am", done: true },
  { id: "act_8", dogId: "dog_goofy", emoji: "🐕", label: "Play & socialisation", time: "10:30 am", done: true, photo: img.goofyGarden },
  { id: "act_9", dogId: "dog_goofy", emoji: "🥣", label: "Lunch", time: "1:00 pm", done: true },
  { id: "act_10", dogId: "dog_goofy", emoji: "🎓", label: "Training games", time: "5:00 pm", done: false },
];

export const documents: DocumentRecord[] = [
  { id: "doc_1", dogId: "dog_bruno", name: "Vaccination card", type: "PDF", uploadedOn: "04 Jul 2026" },
  { id: "doc_2", dogId: "dog_bruno", name: "Microchip certificate", type: "PDF", uploadedOn: "11 Jan 2026" },
  { id: "doc_3", dogId: "dog_goofy", name: "Vaccination card", type: "PDF", uploadedOn: "22 May 2026" },
];

export const dayTimeline = [
  { time: "07:00", emoji: "🌅", label: "Morning walk", detail: "A calm start with a proper sniff-led walk." },
  { time: "08:00", emoji: "🥣", label: "Breakfast", detail: "Served exactly to your feeding instructions." },
  { time: "10:00", emoji: "🐕", label: "Play & socialization", detail: "Matched play groups, always supervised." },
  { time: "13:00", emoji: "😴", label: "Rest", detail: "Quiet time in a comfortable rest space." },
  { time: "16:00", emoji: "🎓", label: "Training / enrichment", detail: "Short sessions, puzzles and scent games." },
  { time: "18:00", emoji: "🌳", label: "Evening walk", detail: "A second outing before the day winds down." },
  { time: "20:00", emoji: "🥣", label: "Dinner", detail: "Portioned meals and fresh water." },
  { time: "21:00", emoji: "❤️", label: "Relaxation", detail: "Brushing, cuddles and lights out." },
];

export const facility: Facility = {
  id: "fac_1",
  city: "Pune",
  status: "planned",
  areas: [
    { emoji: "🏡", name: "Boarding", detail: "Comfortable, home-style stay areas.", status: "planned" },
    { emoji: "🌳", name: "Outdoor play", detail: "Secure open space for supervised play.", status: "planned" },
    { emoji: "🐕", name: "Activity areas", detail: "Enrichment and structured group play.", status: "planned" },
    { emoji: "🛏️", name: "Rest areas", detail: "Quiet zones for proper sleep.", status: "planned" },
    { emoji: "🎓", name: "Training", detail: "A dedicated space for sessions.", status: "planned" },
    { emoji: "✂️", name: "Grooming", detail: "Calm, low-stress grooming setup.", status: "planned" },
    { emoji: "🩺", name: "Veterinary support", detail: "Veterinary expertise built into care.", status: "coming-soon" },
    { emoji: "🥣", name: "Feeding", detail: "Individual meal plans and storage.", status: "planned" },
    { emoji: "📹", name: "Care updates", detail: "Photo and activity updates for parents.", status: "planned" },
  ],
};

export const rooms: Room[] = [
  { id: "A01", name: "Room A01", type: "Large", status: "occupied", dogName: "Bruno" },
  { id: "A02", name: "Room A02", type: "Large", status: "available" },
  { id: "A03", name: "Room A03", type: "Medium", status: "reserved" },
  { id: "A04", name: "Room A04", type: "Medium", status: "available" },
  { id: "B01", name: "Room B01", type: "Small", status: "occupied", dogName: "Goofy" },
  { id: "B02", name: "Room B02", type: "Small", status: "maintenance" },
  { id: "B03", name: "Room B03", type: "Medium", status: "available" },
  { id: "B04", name: "Room B04", type: "Large", status: "reserved" },
];

export const foodProducts: FoodProduct[] = [
  { id: "fp_1", name: "Everyday Fresh Bowl", category: "Natural meals", description: "A balanced fresh meal option for adult dogs.", price: 640, image: img.productFresh, status: "coming-soon" },
  { id: "fp_2", name: "Puppy Starter Meal", category: "Puppy food", description: "Portioned meals designed for growing pups.", price: 720, image: img.productPack, status: "coming-soon" },
  { id: "fp_3", name: "Training Treats", category: "Treats", description: "Small, soft treats made for reward-based training.", price: 320, image: img.productTreats, status: "coming-soon" },
  { id: "fp_4", name: "Adult Daily Meal", category: "Adult food", description: "An everyday option for adult dogs.", price: 690, image: img.productFresh, status: "coming-soon" },
  { id: "fp_5", name: "Crunchy Snacks", category: "Healthy snacks", description: "Simple, single-ingredient snacks.", price: 280, image: img.productTreats, status: "coming-soon" },
  { id: "fp_6", name: "Coat & Skin Support", category: "Nutrition products", description: "A supplement option to discuss with your vet.", price: 480, image: img.productPack, status: "coming-soon" },
];

export const foodCategories = [
  "Natural meals",
  "Treats",
  "Healthy snacks",
  "Puppy food",
  "Adult food",
  "Nutrition products",
];

export const vets: Vet[] = [
  {
    id: "vet_1",
    name: "Sonal Dixit",
    role: "Veterinary Advisor",
    bio: "Sonal Dixit is a qualified veterinarian with undergraduate and postgraduate veterinary education and is currently pursuing a PhD in Veterinary Surgery.",
  },
];

export const founders = [
  {
    id: "team_1",
    name: "Bipin Pandey",
    role: "Founder",
    bio: "Bipin Pandey is a dog parent, technology professional and the founder of Paw Brothers. Inspired by his own experience caring for Bruno and Goofy, Bipin is building Paw Brothers to create a trusted, technology-enabled dog-care experience for dog parents in Pune.",
    photo: img.goofyParent,
  },
  {
    id: "team_2",
    name: "Sonal Dixit",
    role: "Veterinary Advisor",
    bio: "Sonal Dixit is a qualified veterinarian with undergraduate and postgraduate veterinary education and is currently pursuing a PhD in Veterinary Surgery.",
    photo: img.vet,
  },
];

export const staff: Staff[] = [
  { id: "st_1", name: "Bipin Pandey", role: "Founder" },
  { id: "st_2", name: "Sonal Dixit", role: "Veterinary Advisor" },
];

export const sampleReviews: Review[] = [
  { id: "rv_1", quote: "Finally, a place where I can imagine leaving my dog without worrying.", author: "Sample testimonial", context: "Dog parent, Pune", sample: true },
  { id: "rv_2", quote: "Love the idea of seeing updates while my dog is staying.", author: "Sample testimonial", context: "Dog parent, Pune", sample: true },
  { id: "rv_3", quote: "The care instructions detail is exactly what I've been looking for.", author: "Sample testimonial", context: "Dog parent, Pune", sample: true },
];

export const trustStrip = [
  { emoji: "❤️", title: "Family-Level Care" },
  { emoji: "🩺", title: "Veterinary Expertise" },
  { emoji: "🏡", title: "A Safe Second Home" },
  { emoji: "📱", title: "Modern Dog-Care Experience" },
];

export const whyCards = [
  { title: "Love", body: "We care for dogs the way we'd want someone to care for our own." },
  { title: "Trust", body: "Clear communication and thoughtful care every step of the way." },
  { title: "Expertise", body: "Veterinary knowledge as part of our approach to responsible dog care." },
  { title: "Technology", body: "Simple digital access to bookings, updates and your dog's information." },
];

export const journeyCards = [
  { title: "Morning walks", photo: img.brunoBalcony, caption: "First light, first sniff of the day." },
  { title: "Training", photo: img.brunoSit, caption: "Short sessions, big wins." },
  { title: "Playtime", photo: img.goofyGarden, caption: "Grass, sunshine and zoomies." },
  { title: "Healthy meals", photo: img.brunoSofa, caption: "Measured, on time, every time." },
  { title: "Grooming", photo: img.goofyTree, caption: "Brushed, clean and very pleased." },
  { title: "Adventures", photo: img.brothers, caption: "Two brothers, one plan: everything." },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
