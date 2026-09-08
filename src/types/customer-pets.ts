export type CustomerPet = {
  id: string;
  owner_user_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  breed: string | null;
  age_years: number | null;
  weight_kg: number | null;
  gender: "male" | "female" | "unknown";
  photo_path: string | null;
  notes: string | null;
};

export type PetVaccination = {
  id: string;
  pet_id: string;
  owner_user_id: string;
  created_at: string;
  vaccine_name: string;
  given_on: string;
  next_due_on: string | null;
};

export type PetDocument = {
  id: string;
  pet_id: string;
  owner_user_id: string;
  created_at: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  document_type: string | null;
};
