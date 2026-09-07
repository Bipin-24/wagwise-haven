-- Replace BOOKING_WEBHOOK_SECRET_VALUE with the same letters-and-numbers value
-- stored in the BOOKING_WEBHOOK_SECRET Edge Function secret.
create extension if not exists pg_net;

create or replace function public.send_booking_notification()
returns trigger
language plpgsql
security definer
set search_path = public, net
as $$
begin
  perform net.http_post(
    url := 'https://tzqkcuxwcpklhitypbla.supabase.co/functions/v1/booking-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'BOOKING_WEBHOOK_SECRET_VALUE'
    ),
    body := jsonb_build_object('record', to_jsonb(new))
  );
  return new;
end;
$$;

drop trigger if exists email_new_booking_request on public.booking_requests;

create trigger email_new_booking_request
after insert on public.booking_requests
for each row
execute function public.send_booking_notification();