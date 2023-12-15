create extension if not exists "wrappers" with schema "extensions";


create table "public"."bookings" (
    "id" uuid not null default gen_random_uuid(),
    "service_id" uuid,
    "customer_id" uuid,
    "payment_status" character varying,
    "paid_amount" numeric,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."bookings" enable row level security;

alter table "public"."services" drop column "hourly_rate";

alter table "public"."services" add column "price" numeric not null;

alter table "public"."services" alter column "description" set not null;

alter table "public"."services" alter column "title" set not null;

CREATE UNIQUE INDEX bookings_pkey ON public.bookings USING btree (id);

alter table "public"."bookings" add constraint "bookings_pkey" PRIMARY KEY using index "bookings_pkey";

alter table "public"."bookings" add constraint "bookings_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES auth.users(id) not valid;

alter table "public"."bookings" validate constraint "bookings_customer_id_fkey";

alter table "public"."bookings" add constraint "bookings_service_id_fkey" FOREIGN KEY (service_id) REFERENCES services(id) not valid;

alter table "public"."bookings" validate constraint "bookings_service_id_fkey";

grant delete on table "public"."bookings" to "anon";

grant insert on table "public"."bookings" to "anon";

grant references on table "public"."bookings" to "anon";

grant select on table "public"."bookings" to "anon";

grant trigger on table "public"."bookings" to "anon";

grant truncate on table "public"."bookings" to "anon";

grant update on table "public"."bookings" to "anon";

grant delete on table "public"."bookings" to "authenticated";

grant insert on table "public"."bookings" to "authenticated";

grant references on table "public"."bookings" to "authenticated";

grant select on table "public"."bookings" to "authenticated";

grant trigger on table "public"."bookings" to "authenticated";

grant truncate on table "public"."bookings" to "authenticated";

grant update on table "public"."bookings" to "authenticated";

grant delete on table "public"."bookings" to "service_role";

grant insert on table "public"."bookings" to "service_role";

grant references on table "public"."bookings" to "service_role";

grant select on table "public"."bookings" to "service_role";

grant trigger on table "public"."bookings" to "service_role";

grant truncate on table "public"."bookings" to "service_role";

grant update on table "public"."bookings" to "service_role";


create schema if not exists "stripe";


