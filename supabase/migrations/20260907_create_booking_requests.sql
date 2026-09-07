create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  dog_name text not null,
  service_slug text not null,
  requested_start_date date,
  requested_end_date date,
  care_preferences jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined', 'cancelled'))
);

alter table public.booking_requests enable row level security;

create policy "Anyone can submit booking requests"
  on public.booking_requests
  for insert
  to anon
  with check (true);