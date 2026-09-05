import heroMain from "@/assets/gen/hero-main.jpg";
import boardingImg from "@/assets/gen/boarding.jpg";
import trainingImg from "@/assets/gen/training.jpg";
import vetImg from "@/assets/gen/vet.jpg";
import foodImg from "@/assets/gen/food.jpg";
import groomingImg from "@/assets/gen/grooming.jpg";
import walkingImg from "@/assets/gen/walking.jpg";
import communityImg from "@/assets/gen/community.jpg";
import productPack from "@/assets/gen/product-pack.jpg";
import productTreats from "@/assets/gen/product-treats.jpg";
import productFresh from "@/assets/gen/product-fresh.jpg";
import logoAsset from "@/assets/logo.png.asset.json";
import heroPlayAsset from "@/assets/hero-play.jpg.asset.json";
import heroBallAsset from "@/assets/hero-ball.jpg.asset.json";
import heroRunAsset from "@/assets/hero-run.jpg.asset.json";

export const img = {
  hero: heroMain,
  boarding: boardingImg,
  training: trainingImg,
  vet: vetImg,
  food: foodImg,
  grooming: groomingImg,
  walking: walkingImg,
  community: communityImg,
  productPack,
  productTreats,
  productFresh,
  logo: logoAsset.url,
  play: heroPlayAsset.url,
  ball: heroBallAsset.url,
  run: heroRunAsset.url,
};

export type Service = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  facilities: string[];
  included: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "boarding",
    name: "Dog Boarding",
    emoji: "🐾",
    tagline: "Safe, loving stays while you're away.",
    description:
      "Your dog stays in a real home in Pune — no cages, no kennels. Garden play through the day, a soft bed at night, and photo updates every evening so you never wonder how they're doing.",
    image: boardingImg,
    price: 899,
    priceUnit: "night",
    rating: 4.9,
    reviews: 412,
    facilities: [
      "Home-style rooms with orthopaedic beds",
      "500 sq ft fenced garden for off-leash play",
      "Air-conditioned indoor rest areas",
      "24×7 live-in caretakers",
      "CCTV in all common areas",
      "Vet on call within 10 minutes",
    ],
    included: [
      "Three walks a day",
      "Daily photo & video updates",
      "Fresh home-cooked meals",
      "Bedtime brushing and cuddles",
      "Free pick-up within 8 km of Kothrud",
    ],
    faqs: [
      {
        q: "How many dogs do you host at once?",
        a: "A maximum of six, so every dog gets real attention and space.",
      },
      {
        q: "What if my dog has a special diet?",
        a: "Send their food along or tell us the plan — we follow it exactly and log every meal.",
      },
      {
        q: "Do you take unvaccinated dogs?",
        a: "We need up-to-date DHPPi and anti-rabies records for the safety of every guest.",
      },
    ],
  },
  {
    slug: "training",
    name: "Dog Training",
    emoji: "🦮",
    tagline: "Build better habits. Build a stronger bond.",
    description:
      "Positive-reinforcement training shaped around your dog's breed, age and personality. We train you as much as we train them, so the results last long after the sessions end.",
    image: trainingImg,
    price: 1200,
    priceUnit: "session",
    rating: 4.8,
    reviews: 268,
    facilities: [
      "Certified force-free trainers",
      "At-home and open-ground sessions",
      "Small group socialisation classes",
      "Written progress report after each session",
    ],
    included: [
      "Initial behaviour assessment",
      "Custom 6-week plan",
      "Homework videos for the family",
      "WhatsApp support between sessions",
    ],
    faqs: [
      { q: "What age can we start?", a: "From 8 weeks — early puppy work is the easiest work." },
      {
        q: "Do you use e-collars or prong collars?",
        a: "Never. Everything we do is reward-based and force-free.",
      },
    ],
  },
  {
    slug: "vet",
    name: "Online Vet",
    emoji: "❤️",
    tagline: "Expert veterinary advice from the comfort of home.",
    description:
      "Video consultations with licensed veterinarians for everything that doesn't need an emergency drive — skin issues, diet plans, second opinions, post-surgery checks and puppy guidance.",
    image: vetImg,
    price: 499,
    priceUnit: "consult",
    rating: 4.9,
    reviews: 1034,
    facilities: [
      "Licensed Indian veterinarians",
      "Same-day slots, 8am to 11pm",
      "Digital prescription and notes",
      "Follow-up message window of 48 hours",
    ],
    included: [
      "20-minute video consultation",
      "Written summary and care plan",
      "Diet and supplement guidance",
      "Referral to a clinic if needed",
    ],
    faqs: [
      {
        q: "Is this a replacement for a clinic?",
        a: "No. For emergencies, trauma or surgery we will send you straight to a clinic.",
      },
      { q: "Can I get medicines prescribed?", a: "Yes, where it is clinically appropriate and legal to do so." },
    ],
  },
  {
    slug: "food",
    name: "Natural Food",
    emoji: "🥩",
    tagline: "Healthy food made with love.",
    description:
      "Fresh, preservative-free meals cooked in small batches from locally sourced ingredients — portioned for your dog's weight, age and activity, delivered across Pune.",
    image: foodImg,
    price: 249,
    priceUnit: "day",
    rating: 4.7,
    reviews: 587,
    facilities: [
      "Human-grade ingredients",
      "Vet-formulated recipes",
      "No preservatives, colours or fillers",
      "Cold-chain delivery across Pune",
    ],
    included: [
      "Personalised portion plan",
      "Weekly delivery",
      "Free transition guide",
      "Pause or cancel any week",
    ],
    faqs: [
      { q: "How long does it keep?", a: "Five days refrigerated, three months frozen." },
      { q: "Do you cater to allergies?", a: "Yes — tell us the triggers and we build the recipe around them." },
    ],
  },
  {
    slug: "grooming",
    name: "Grooming",
    emoji: "🛁",
    tagline: "Clean coat, calm dog, zero drama.",
    description:
      "Low-stress grooming with gentle handling, breed-appropriate cuts and pet-safe products. At our studio or at your doorstep in a fully equipped van.",
    image: groomingImg,
    price: 799,
    priceUnit: "session",
    rating: 4.8,
    reviews: 341,
    facilities: [
      "Fear-free handling protocol",
      "Hypoallergenic shampoos",
      "Doorstep grooming van",
      "Nail, ear and paw care",
    ],
    included: ["Bath and blow dry", "Brush-out and de-shed", "Nail trim", "Ear and paw cleaning"],
    faqs: [
      { q: "My dog hates grooming. Now what?", a: "We do a slow desensitising first visit — no forcing, ever." },
    ],
  },
  {
    slug: "walking",
    name: "Dog Walking",
    emoji: "🚶",
    tagline: "Daily walks, sent to your phone.",
    description:
      "Reliable, insured walkers who show up on time, follow your route preferences and share a GPS-tracked summary with photos after every walk.",
    image: walkingImg,
    price: 299,
    priceUnit: "walk",
    rating: 4.9,
    reviews: 726,
    facilities: [
      "Background-verified walkers",
      "GPS-tracked routes",
      "Same walker every day",
      "Morning and evening slots",
    ],
    included: ["30 or 45 minute walk", "Water break", "Paw wipe-down", "Photo report"],
    faqs: [{ q: "Can I choose my walker?", a: "Yes — meet two walkers first, then pick your regular." }],
  },
];

export const quickServices = services;

export const trainingPrograms = [
  { name: "Puppy Training", for: "For young dogs", weeks: "4 weeks", detail: "Toilet training, bite inhibition, crate comfort and early socialisation." },
  { name: "Obedience Training", for: "For everyday manners", weeks: "6 weeks", detail: "Sit, stay, recall, loose-leash walking and calm greetings at the door." },
  { name: "Behavioural Training", for: "For challenging behaviours", weeks: "8 weeks", detail: "Reactivity, separation anxiety, resource guarding and fear work." },
  { name: "Advanced Training", for: "For advanced skills", weeks: "10 weeks", detail: "Off-leash reliability, scent games, tricks and canine sport foundations." },
];

export const vets = [
  { name: "Dr. Priya Sharma", role: "Veterinarian", spec: "Dermatology & Allergies", rating: 4.9, years: "12+", online: true },
  { name: "Dr. Aditya Kulkarni", role: "Veterinarian", spec: "Internal Medicine", rating: 4.8, years: "9+", online: true },
  { name: "Dr. Neha Rane", role: "Veterinary Nutritionist", spec: "Diet & Weight Care", rating: 5.0, years: "7+", online: false },
  { name: "Dr. Imran Shaikh", role: "Veterinarian", spec: "Orthopaedics", rating: 4.7, years: "15+", online: true },
];

export const foodCategories = ["Puppy", "Adult", "Senior", "Treats", "Supplements", "Fresh Food"];

export const products = [
  { name: "Everyday Chicken & Rice", desc: "Slow-cooked chicken, brown rice and seasonal greens.", price: 640, rating: 4.8, image: productFresh, category: "Adult" },
  { name: "Puppy Growth Bowl", desc: "Higher protein and calcium for growing pups.", price: 720, rating: 4.9, image: productPack, category: "Puppy" },
  { name: "Pumpkin & Chicken Biscuits", desc: "Two-ingredient training treats, baked fresh weekly.", price: 320, rating: 4.7, image: productTreats, category: "Treats" },
  { name: "Senior Joint Support Meal", desc: "Lean protein with turmeric and omega-3.", price: 690, rating: 4.8, image: productFresh, category: "Senior" },
  { name: "Coat & Skin Supplement", desc: "Cold-pressed fish oil blend for a shining coat.", price: 480, rating: 4.6, image: productPack, category: "Supplements" },
  { name: "Fresh Mutton Feast", desc: "Small-batch mutton with pumpkin and spinach.", price: 780, rating: 4.9, image: productFresh, category: "Fresh Food" },
];

export const testimonials = [
  {
    name: "Ananya Desai",
    dog: "Bruno · Golden Retriever",
    rating: 5,
    text: "Leaving Bruno here while travelling was the best decision. He came back happy, healthy and clearly had a wonderful time.",
    avatar: heroBallAsset.url,
    dogPhoto: heroPlayAsset.url,
  },
  {
    name: "Rohan Mehta",
    dog: "Simba · Indie",
    rating: 5,
    text: "Six weeks of training and our reactive rescue now walks past other dogs calmly. They coached us more than they coached him.",
    avatar: heroRunAsset.url,
    dogPhoto: walkingImg,
    },
  {
    name: "Sneha Kulkarni",
    dog: "Coco · Shih Tzu",
    rating: 5,
    text: "The online vet caught a skin infection on a Sunday night. Prescription in ten minutes, and Coco was fine by Wednesday.",
    avatar: heroPlayAsset.url,
    dogPhoto: groomingImg,
  },
];

export const stats = [
  { value: "2,400+", label: "Happy dogs cared for" },
  { value: "4.9★", label: "Average parent rating" },
  { value: "6", label: "Dogs boarded at a time" },
  { value: "24×7", label: "Live-in care & vet on call" },
];

export const dogProfile = {
  name: "Bruno",
  breed: "Golden Retriever",
  age: "3 years old",
  weight: "28 kg",
  gender: "Male",
  vaccination: "Up to date · Next due 12 Mar 2027",
  allergies: "Chicken liver",
  notes: "Loves tennis balls. Nervous around fireworks — needs a quiet room in the evening.",
  photo: heroPlayAsset.url,
};

export const bookings = [
  { service: "Dog Boarding", dates: "12 – 18 Oct", status: "Confirmed", price: 5394, image: boardingImg },
  { service: "Grooming", dates: "24 Sep, 11:00 am", status: "Upcoming", price: 799, image: groomingImg },
  { service: "Online Vet · Dr. Priya Sharma", dates: "2 Sep, 7:30 pm", status: "Completed", price: 499, image: vetImg },
];

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
