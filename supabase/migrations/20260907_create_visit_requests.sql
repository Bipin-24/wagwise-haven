create table if not exists public.visit_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  dog_name text,
  breed text,
  dog_age text,
  area text,
  interests text[] not null default '{}'
);

alter table public.visit_requests enable row level security;

drop policy if exists "Anyone can request a free visit" on public.visit_requests;

create policy "Anyone can request a free visit"
  on public.visit_requests
  for insert
  to anon
  with check (true);