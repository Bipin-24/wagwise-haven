create table if not exists public.booking_managers (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.booking_managers enable row level security;

create or replace function public.is_booking_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.booking_managers
    where email = (auth.jwt() ->> 'email')
  );
$$;

drop policy if exists "Managers can read booking requests" on public.booking_requests;

create policy "Managers can read booking requests"
  on public.booking_requests
  for select
  to authenticated
  using (public.is_booking_manager());

drop policy if exists "Managers can update booking requests" on public.booking_requests;

create policy "Managers can update booking requests"
  on public.booking_requests
  for update
  to authenticated
  using (public.is_booking_manager())
  with check (public.is_booking_manager());

insert into public.booking_managers (email)
values
  ('pandey.bipin2@gmail.com')
on conflict (email) do nothing;