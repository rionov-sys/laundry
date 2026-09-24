import { useCallback, useEffect, useState } from 'react'
import CustomerCard from './pos/CustomerCard'
import ScaleCard from './pos/ScaleCard'
import ServiceCatalog from './pos/ServiceCatalog'
import NotaPanel from './pos/NotaPanel'
import OrderHistory from './pos/OrderHistory'
import { ACTIVE_CUSTOMER, CASHIER_NAME, INITIAL_ITEMS } from './pos/data'
import { fetchOrders, isSupabaseConfigured, submitOrder } from '../lib/supabase'

function generateOrderNumber() {
  const year = new Date().getFullYear()
  return `GLC-${year}-${Math.floor(1000 + Math.random() * 9000)}`
}

// Halaman Kasir & Transaksi POS — layout 2 kolom sesuai desain (64% katalog / 36% nota)
export default function PosPage() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [scale, setScale] = useState(4.85)
  const [orderNumber, setOrderNumber] = useState('GLC-2024-0891')
  const [saving, setSaving] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')

  const loadOrders = useCallback(async () => {
    if (!isSupabaseConfigured) return
    setOrdersLoading(true)
    setOrdersError('')
    try {
      setOrders(await fetchOrders())
    } catch (error) {
      setOrdersError(error.message)
    } finally {
      setOrdersLoading(false)
    }
  }, [])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const addToOrder = ({ id, name, rate, unit }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, qty: Math.round((item.qty + item.step) * 100) / 100 }
            : item,
        )
      }
      return [...prev, { id, name, rate, unit, qty: 1, step: unit === 'kg' ? 0.05 : 1 }]
    })
  }

  const changeQty = (id, direction) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: Math.max(0, Math.round((item.qty + direction * item.step) * 100) / 100),
              }
            : item,
        )
        .filter((item) => item.qty > 0),
    )
  }

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id))

  // tareScale() pada desain: layar 0.00 lalu kembali ke pembacaan bobot
  const tare = () => {
    setScale(0)
    setTimeout(() => setScale(4.85), 1500)
  }

  // autoWeighAdd() pada desain: bobot IoT dimasukkan ke nota Cuci Komplit
  const inputBobot = () => {
    setItems((prev) =>
      prev.map((item) => (item.id === 'cuci-komplit-reguler' ? { ...item, qty: 4.85 } : item)),
    )
    window.alert('Bobot IoT 4.85 Kg berhasil dimasukkan ke kalkulator nota Cuci Komplit!')
  }

  // Simpan nota ke Supabase (tabel orders + order_items), lalu segarkan daftar pesanan
  const saveOrder = async (meta) => {
    if (!isSupabaseConfigured) {
      window.alert(
        'Supabase belum terkonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env lalu jalankan ulang npm run dev.',
      )
      return
    }
    if (items.length === 0) {
      window.alert(
        'Nota masih kosong. Tambahkan layanan dari katalog terlebih dahulu sebelum menyimpan pesanan.',
      )
      return
    }
    setSaving(true)
    try {
      await submitOrder(
        {
          order_number: orderNumber,
          customer_id: ACTIVE_CUSTOMER.id,
          customer_name: ACTIVE_CUSTOMER.name,
          customer_phone: ACTIVE_CUSTOMER.phone,
          cashier_name: CASHIER_NAME,
          ...meta,
        },
        items,
      )
      window.alert(
        `Transaksi #${orderNumber} Berhasil Disimpan!\nStruk thermal sedang dicetak ke printer default.\nData tersimpan di Supabase.`,
      )
      setItems([])
      setOrderNumber(generateOrderNumber())
      loadOrders()
    } catch (error) {
      window.alert(`Gagal menyimpan pesanan: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 w-full relative">
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full relative">
        <div className="w-full lg:w-[64%] flex flex-col gap-6">
          <CustomerCard />
          <ScaleCard scale={scale} onTare={tare} onInputBobot={inputBobot} />
          <ServiceCatalog onAdd={addToOrder} />
        </div>
        <div className="w-full lg:w-[36%] flex flex-col gap-5 sticky top-20">
          <NotaPanel
            items={items}
            onIncrement={(id) => changeQty(id, 1)}
            onDecrement={(id) => changeQty(id, -1)}
            onRemove={removeItem}
            onSave={saveOrder}
            saving={saving}
            orderNumber={orderNumber}
          />
        </div>
      </div>
      <OrderHistory
        orders={orders}
        loading={ordersLoading}
        error={ordersError}
        onRefresh={loadOrders}
      />
    </div>
  )
}
