-- ============================================================
-- Glacier Laundry — Skema Database Supabase (Halaman Kasir POS)
-- Cara pakai:
--   1. Supabase Dashboard > SQL Editor > New query
--   2. Tempel seluruh isi file ini > Run
--   3. Isi file .env lalu jalankan ulang `npm run dev`
-- ============================================================

create extension if not exists pgcrypto;

-- 1. Tabel pesanan (nota POS)
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    text not null unique,
  customer_id     text,
  customer_name   text not null,
  customer_phone  text,
  cashier_name    text,
  payment_status  text not null default 'lunas'
                    check (payment_status in ('lunas', 'dp', 'ambil')),
  payment_method  text not null default 'qris'
                    check (payment_method in ('qris', 'tunai', 'transfer', 'poin')),
  coupon_code     text,
  subtotal        integer not null default 0 check (subtotal >= 0),
  discount        integer not null default 0 check (discount >= 0),
  rounding        integer not null default 0,  -- boleh negatif (pembulatan kasir)
  total           integer not null default 0 check (total >= 0),
  notes           text,
  created_at      timestamptz not null default now()
);

-- 2. Tabel item pesanan (rincian per layanan)
create table if not exists public.order_items (
  id           uuid primary key default gen_random_uuid(),
  order_id     uuid not null references public.orders (id) on delete cascade,
  service_name text not null,
  rate         integer not null check (rate >= 0),
  unit         text not null,                -- kg / psg / pcs / set / m²
  qty          numeric(10, 2) not null check (qty > 0),
  line_total   integer not null default 0,
  note_text    text,                         -- mis. "Aroma: Ocean Breeze"
  created_at   timestamptz not null default now()
);

-- Index untuk daftar riwayat (terbaru dulu) & join item
create index if not exists orders_created_at_idx
  on public.orders (created_at desc);
create index if not exists order_items_order_id_idx
  on public.order_items (order_id);

-- 3. Row Level Security: frontend memakai role `anon` (anon key),
--    maka cukup izinkan SELECT + INSERT untuk role anon.
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "anon_select_orders" on public.orders;
create policy "anon_select_orders" on public.orders
  for select to anon using (true);

drop policy if exists "anon_insert_orders" on public.orders;
create policy "anon_insert_orders" on public.orders
  for insert to anon with check (true);

drop policy if exists "anon_select_order_items" on public.order_items;
create policy "anon_select_order_items" on public.order_items
  for select to anon using (true);

drop policy if exists "anon_insert_order_items" on public.order_items;
create policy "anon_insert_order_items" on public.order_items
  for insert to anon with check (true);

-- Selesai. Cek hasil:
--   select o.order_number, o.customer_name, o.total, count(i.id) as item_count
--   from public.orders o left join public.order_items i on i.order_id = o.id
--   group by o.id order by o.created_at desc;
