import { createClient } from '@supabase/supabase-js'

// Kredensial dari file .env di root project. Hanya variabel ber-prefix VITE_
// yang di-expose Vite ke frontend.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Client dibuat hanya jika kredensial terisi — createClient('') akan melempar error,
// sehingga app tetap jalan (dengan pemberitahuan) sebelum .env diisi.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

function requireClient() {
  if (!supabase) {
    throw new Error(
      'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env lalu jalankan ulang `npm run dev`.',
    )
  }
  return supabase
}

// Simpan 1 nota POS beserta seluruh itemnya ke tabel orders + order_items.
export async function submitOrder(order, items) {
  const client = requireClient()

  const { data: created, error: orderError } = await client
    .from('orders')
    .insert(order)
    .select()
    .single()
  if (orderError) throw orderError

  const itemRows = items.map((item) => ({
    order_id: created.id,
    service_name: item.name,
    rate: item.rate,
    unit: item.unit,
    qty: item.qty,
    line_total: Math.round(item.rate * item.qty),
    note_text: item.note?.text ?? null,
  }))

  const { error: itemsError } = await client.from('order_items').insert(itemRows)
  if (itemsError) {
    // Jaga-jaga: hapus pesanan "yatim" jika insert item gagal di tengah jalan
    await client.from('orders').delete().eq('id', created.id)
    throw itemsError
  }
  return created
}

// Ambil pesanan terbaru beserta itemnya untuk daftar riwayat.
export async function fetchOrders(limit = 25) {
  const client = requireClient()
  const { data, error } = await client
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}
