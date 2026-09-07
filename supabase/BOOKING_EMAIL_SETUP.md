# Booking email notifications

This function emails Paw Brothers when a row is inserted into `booking_requests` and emails a customer when their request changes to `confirmed`.

## 1. Create a Resend account

1. Create an account at https://resend.com.
2. Verify a sending address. A custom domain is recommended. For development, use the Resend onboarding sender available in your account.
3. Create an API key with sending permission.

## 2. Deploy the Edge Function

In the Supabase dashboard, open **Edge Functions**, create `booking-notification`, and paste the contents of `functions/booking-notification/index.ts`.

Set **Verify JWT** to off. The function uses the private webhook secret below instead.

## 3. Add Edge Function secrets

In **Edge Functions -> Secrets**, add these values directly:

| Secret | Value |
| --- | --- |
| `RESEND_API_KEY` | Your Resend API key |
| `RESEND_FROM_EMAIL` | A verified sender, for example `Paw Brothers <bookings@your-domain.com>` |
| `BOOKING_NOTIFICATION_EMAIL` | `pawbrothers24@gmail.com` |
| `BOOKING_WEBHOOK_SECRET` | A long random value you create and keep private |

## 4. Create the database trigger

In **SQL Editor**, run the contents of `migrations/20260907_create_booking_email_trigger.sql`.

Replace `BOOKING_WEBHOOK_SECRET_VALUE` in the script with the exact value of the
`BOOKING_WEBHOOK_SECRET` Edge Function secret before you run it. Use letters and
numbers only for this secret so it is safe to place inside the SQL string.

The trigger uses Supabase's `pg_net` extension to call the Edge Function after every
new booking and status update. A new booking sends an owner notification. Changing a
request to `confirmed` in `/dashboard` sends a confirmation to the customer's email.