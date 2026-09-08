create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  breed text,
  age_years numeric,
  weight_kg numeric,
  gender text not null default 'unknown' check (gender in ('male', 'female', 'unknown')),
  photo_path text,
  notes text
);

create table if not exists public.pet_vaccinations (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  vaccine_name text not null,
  given_on date not null,
  next_due_on date
);

create table if not exists public.pet_documents (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  file_name text not null,
  storage_path text not null,
  mime_type text,
  size_bytes bigint,
  document_type text
);

create index if not exists pets_owner_user_id_idx on public.pets (owner_user_id);
create index if not exists pet_vaccinations_pet_id_idx on public.pet_vaccinations (pet_id);
create index if not exists pet_documents_pet_id_idx on public.pet_documents (pet_id);

-- Force child rows to inherit their parent pet's owner, regardless of what the
-- client sends. Without this, a client could insert a pet_vaccinations/pet_documents
-- row with owner_user_id = auth.uid() (passing the RLS with-check) while pointing
-- pet_id at another customer's pet, attaching data to a pet it doesn't own.
create or replace function public.set_pet_child_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select owner_user_id into new.owner_user_id
  from public.pets
  where id = new.pet_id;

  if new.owner_user_id is null then
    raise exception 'pet_id % does not reference an existing pet', new.pet_id;
  end if;

  return new;
end;
$$;

drop trigger if exists set_pet_vaccinations_owner on public.pet_vaccinations;
create trigger set_pet_vaccinations_owner
  before insert on public.pet_vaccinations
  for each row execute function public.set_pet_child_owner();

drop trigger if exists set_pet_documents_owner on public.pet_documents;
create trigger set_pet_documents_owner
  before insert on public.pet_documents
  for each row execute function public.set_pet_child_owner();

alter table public.pets enable row level security;
alter table public.pet_vaccinations enable row level security;
alter table public.pet_documents enable row level security;

drop policy if exists "Owners manage their own pets" on public.pets;
create policy "Owners manage their own pets"
  on public.pets
  for all
  to authenticated
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

drop policy if exists "Owners manage their own pet vaccinations" on public.pet_vaccinations;
create policy "Owners manage their own pet vaccinations"
  on public.pet_vaccinations
  for all
  to authenticated
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

drop policy if exists "Owners manage their own pet documents" on public.pet_documents;
create policy "Owners manage their own pet documents"
  on public.pet_documents
  for all
  to authenticated
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

-- Private bucket: pet documents/photos are personal medical records, served via
-- short-lived signed URLs rather than permanent public links.
insert into storage.buckets (id, name, public)
values ('pet-documents', 'pet-documents', false)
on conflict (id) do nothing;

-- Objects are stored at {owner_user_id}/{pet_id}/{uuid}-{filename}. The leading
-- folder segment is what these policies check against auth.uid(), so every
-- upload path must start with the uploader's own user id.
drop policy if exists "Owners read their own pet document objects" on storage.objects;
create policy "Owners read their own pet document objects"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'pet-documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owners upload their own pet document objects" on storage.objects;
create policy "Owners upload their own pet document objects"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'pet-documents' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Owners delete their own pet document objects" on storage.objects;
create policy "Owners delete their own pet document objects"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'pet-documents' and (storage.foldername(name))[1] = auth.uid()::text);
