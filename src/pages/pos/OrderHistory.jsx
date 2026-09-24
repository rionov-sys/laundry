import Icon from '../../components/Icon'
import { formatRp } from './data'
import { isSupabaseConfigured } from '../../lib/supabase'

const STATUS_LABEL = { lunas: 'Lunas', dp: 'Uang Muka', ambil: 'Bayar Ambil' }
const STATUS_CLASS = {
  lunas: 'bg-primary/15 text-primary',
  dp: 'bg-tertiary-container/60 text-tertiary',
  ambil: 'bg-error/15 text-error',
}
const METHOD_LABEL = {
  qris: 'QRIS Instan',
  tunai: 'Tunai / Cash',
  transfer: 'Transfer Bank',
  poin: 'Potong Poin',
}

function formatDateTime(iso) {
  return (
    new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso)) + ' WIB'
  )
}

// Daftar pesanan yang telah dibuat — dibaca langsung dari Supabase
export default function OrderHistory({ orders, loading, error, onRefresh }) {
  return (
    <div className="p-6 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary-container/40 text-primary">
            <Icon name="receipt_long" className="text-[18px]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-on-surface tracking-tight">
              Daftar Pesanan Tersimpan
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Sinkron langsung dari Supabase — nota yang disimpan dari halaman POS
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-[11px] font-mono text-on-surface-variant">
            {orders.length} Pesanan
          </span>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-medium transition-all shadow-sm disabled:opacity-60"
            type="button"
            disabled={loading}
            onClick={onRefresh}
          >
            <Icon
              name="refresh"
              className={`text-[16px] text-secondary ${loading ? 'animate-spin' : ''}`}
            />
            <span>Segarkan</span>
          </button>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="p-4 rounded-xl bg-error/10 border border-error/30 flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed">
          <Icon name="cloud_off" className="text-[18px] text-error shrink-0" />
          <span>
            Supabase belum terhubung. Isi{' '}
            <code className="text-primary font-mono">VITE_SUPABASE_URL</code> dan{' '}
            <code className="text-primary font-mono">VITE_SUPABASE_ANON_KEY</code> pada
            file <code className="font-mono">.env</code>, jalankan skema{' '}
            <code className="font-mono">supabase/schema.sql</code> di SQL Editor, lalu
            jalankan ulang <code className="font-mono">npm run dev</code>.
          </span>
        </div>
      )}
      {isSupabaseConfigured && error && (
        <div className="p-4 rounded-xl bg-error/10 border border-error/30 flex items-start gap-2.5 text-xs text-error">
          <Icon name="error" className="text-[18px] shrink-0" />
          <span>Gagal memuat pesanan: {error}</span>
        </div>
      )}

      {isSupabaseConfigured && loading && orders.length === 0 && (
        <div className="flex flex-col gap-2.5">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="h-16 rounded-xl bg-surface-container-high/50 animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {isSupabaseConfigured && !loading && !error && orders.length === 0 && (
        <div className="text-xs text-on-surface-variant text-center py-6">
          Belum ada pesanan tersimpan. Selesaikan transaksi pertama dari nota di kanan.
        </div>
      )}

      {orders.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-xl bg-surface-container-high/60 flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-primary-container text-on-primary-container">
                    <Icon name="receipt" className="text-[16px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-bold text-primary">
                      #{order.order_number}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {order.customer_name}
                      {order.cashier_name ? ` • Kasir: ${order.cashier_name}` : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${STATUS_CLASS[order.payment_status] ?? 'bg-surface-container-highest text-on-surface-variant'}`}
                  >
                    {STATUS_LABEL[order.payment_status] ?? order.payment_status}
                  </span>
                  <span className="text-[10px] font-mono text-on-surface-variant">
                    {METHOD_LABEL[order.payment_method] ?? order.payment_method}
                  </span>
                  <span className="text-sm font-mono font-bold text-on-surface">
                    {formatRp(order.total)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-on-surface-variant">
                <span className="truncate">
                  {(order.order_items ?? []).length} item:{' '}
                  {(order.order_items ?? []).map((item) => item.service_name).join(', ') ||
                    '—'}
                </span>
                <span className="font-mono whitespace-nowrap">
                  {formatDateTime(order.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
