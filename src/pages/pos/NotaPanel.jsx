import { useEffect, useState } from 'react'
import Icon from '../../components/Icon'
import { formatRp, UNIT_SHORT, UNIT_WORDS } from './data'
import { formatWib } from '../../utils/time'

const METHODS = [
  { id: 'qris', icon: 'qr_code_2', label: 'QRIS Instan' },
  { id: 'tunai', icon: 'payments', label: 'Tunai / Cash' },
  { id: 'transfer', icon: 'account_balance', label: 'Transfer Bank' },
  { id: 'poin', icon: 'stars', label: 'Potong Poin (240)' },
]

const ROW = 'flex justify-between items-center text-on-surface-variant'
const LABEL =
  'text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-headline'
const STATUS_ACTIVE =
  'py-2 px-1 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md shadow-primary/20 flex flex-col items-center justify-center transition-transform active:scale-95'
const STATUS_IDLE =
  'py-2 px-1 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant text-xs font-medium flex flex-col items-center justify-center transition-all'
const METHOD_ACTIVE =
  'p-2.5 rounded-xl bg-surface-container-highest text-primary font-bold text-xs flex items-center justify-center gap-2 shadow-inner'
const METHOD_IDLE =
  'p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-highest text-on-surface-variant text-xs font-medium flex items-center justify-center gap-2 transition-all'
const STEPPER_BTN =
  'text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center'

function qtyLabel(item) {
  return item.unit === 'kg'
    ? `${Number(item.qty.toFixed(2))} ${UNIT_SHORT.kg}`
    : `${item.qty} ${UNIT_SHORT[item.unit]}`
}

// Panel nota berjalan: item, kupon, kalkulator total, status & metode bayar
export default function NotaPanel({ items, onIncrement, onDecrement, onRemove }) {
  const [now, setNow] = useState(() => new Date())
  const [couponCode, setCouponCode] = useState('MEMBERSEGAR')
  const [couponApplied, setCouponApplied] = useState(true)
  const [status, setStatus] = useState('lunas')
  const [method, setMethod] = useState('qris')

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const subtotal = items.reduce((sum, item) => sum + Math.round(item.rate * item.qty), 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const afterDiscount = subtotal - discount
  const total = Math.round(afterDiscount / 1000) * 1000
  const rounding = total - afterDiscount
  const roundingText =
    rounding < 0
      ? `-Rp ${Math.abs(rounding).toLocaleString('id-ID')}`
      : `Rp ${rounding.toLocaleString('id-ID')}`

  const toggleCoupon = () => {
    if (couponApplied) {
      setCouponApplied(false)
      return
    }
    if (couponCode.trim().toUpperCase() === 'MEMBERSEGAR') setCouponApplied(true)
    else window.alert('Kode kupon tidak dikenali. Coba kode MEMBERSEGAR.')
  }

  return (
    <div className="p-5 rounded-3xl bg-surface-container/85 backdrop-blur-2xl shadow-2xl shadow-black/40 flex flex-col gap-5 relative">
      <div className="absolute top-0 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="flex items-start justify-between pb-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-primary text-on-primary text-[10px] font-mono font-extrabold uppercase tracking-wide">
              NOTA POS
            </span>
            <span className="text-xs font-mono font-bold text-primary">#GLC-2024-0891</span>
          </div>
          <span className="text-[11px] text-on-surface-variant mt-1 flex items-center gap-1">
            <Icon name="account_circle" className="text-[14px]" />
            Kasir:{' '}
            <strong className="text-on-surface font-semibold">Dian Paramita</strong>
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-on-surface-variant block">
            Waktu Sesi:
          </span>
          <span className="text-xs font-mono font-medium text-primary">
            {formatWib(now)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 max-h-[290px] overflow-y-auto pr-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant font-headline">
          Rincian Item Cuci ({items.length} Item)
        </span>
        {items.length === 0 && (
          <span className="text-xs text-on-surface-variant">
            Belum ada item. Pilih layanan dari katalog untuk memulai nota.
          </span>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-surface-container-high/60 backdrop-blur-md flex flex-col gap-2.5 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">{item.name}</span>
                <span className="text-[10px] text-on-surface-variant">
                  Tarif: {formatRp(item.rate)} / {UNIT_WORDS[item.unit]}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-on-surface">
                {formatRp(item.rate * item.qty)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-surface-container-lowest/80 px-2 py-1 rounded-xl">
                <button
                  className={STEPPER_BTN}
                  type="button"
                  onClick={() => onDecrement(item.id)}
                >
                  <Icon name="remove" className="text-[16px]" />
                </button>
                <span className="text-xs font-mono font-bold text-primary px-1.5">
                  {qtyLabel(item)}
                </span>
                <button
                  className={STEPPER_BTN}
                  type="button"
                  onClick={() => onIncrement(item.id)}
                >
                  <Icon name="add" className="text-[16px]" />
                </button>
              </div>
              {item.note && (
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${item.note.className}`}
                >
                  <Icon name={item.note.icon} className={item.note.iconClass} />
                  <span>{item.note.text}</span>
                </div>
              )}
              <button
                className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-md"
                type="button"
                onClick={() => onRemove(item.id)}
              >
                <Icon name="delete" className="text-[16px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-container-lowest/80">
        <Icon name="sell" className="text-[18px] text-primary ml-2" />
        <input
          className="bg-transparent text-xs font-mono text-on-surface focus:outline-none w-full uppercase tracking-wider font-semibold placeholder:text-on-surface-variant/40"
          placeholder="Kode Kupon Promo"
          type="text"
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
        />
        <button
          className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg whitespace-nowrap"
          type="button"
          onClick={toggleCoupon}
        >
          {couponApplied ? 'Nonaktifkan -10%' : '-10% Terapkan'}
        </button>
      </div>
      <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-surface-container-lowest/50 text-xs">
        <div className={ROW}>
          <span>Subtotal Layanan</span>
          <span className="font-mono text-on-surface">{formatRp(subtotal)}</span>
        </div>
        {couponApplied && (
          <div className={ROW}>
            <span className="flex items-center gap-1">
              Diskon Member Promo (10%)
              <span className="text-[9px] px-1 rounded bg-primary/20 text-primary">
                MEMBERSEGAR
              </span>
            </span>
            <span className="font-mono text-primary font-semibold">
              -Rp {discount.toLocaleString('id-ID')}
            </span>
          </div>
        )}
        <div className={ROW}>
          <span>Pembulatan Kasir POS</span>
          <span className="font-mono text-on-surface">{roundingText}</span>
        </div>
        <div className="pt-2 mt-1 flex justify-between items-baseline">
          <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
            Total Tagihan Bersih
          </span>
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-primary tracking-tight">
              {formatRp(total)}
            </span>
            <span className="text-[10px] text-on-surface-variant block">
              Termasuk PPN &amp; Biaya Kemasan
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className={LABEL}>Status Bayar Di Kasir</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={status === 'lunas' ? STATUS_ACTIVE : STATUS_IDLE}
            type="button"
            onClick={() => setStatus('lunas')}
          >
            <span>Lunas Penuh</span>
            <span className="text-[9px] opacity-80">{formatRp(total)}</span>
          </button>
          <button
            className={status === 'dp' ? STATUS_ACTIVE : STATUS_IDLE}
            type="button"
            onClick={() => setStatus('dp')}
          >
            <span>Uang Muka (DP)</span>
            <span className="text-[9px] text-primary">Rp 30.000</span>
          </button>
          <button
            className={status === 'ambil' ? STATUS_ACTIVE : STATUS_IDLE}
            type="button"
            onClick={() => setStatus('ambil')}
          >
            <span>Bayar Ambil</span>
            <span className="text-[9px] text-on-surface-variant">Belum Lunas</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className={LABEL}>Metode Transaksi</label>
        <div className="grid grid-cols-2 gap-2">
          {METHODS.map((item) => (
            <button
              key={item.id}
              className={item.id === method ? METHOD_ACTIVE : METHOD_IDLE}
              type="button"
              onClick={() => setMethod(item.id)}
            >
              <Icon name={item.icon} className="text-[18px]" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary via-primary-fixed-dim to-primary text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:brightness-110 active:scale-[0.99] transition-all"
          type="button"
          onClick={() =>
            window.alert(
              'Transaksi #GLC-2024-0891 Berhasil Disimpan!\nStruk thermal sedang dicetak ke printer default.',
            )
          }
        >
          <Icon name="print" className="text-[20px]" />
          <span>Simpan &amp; Cetak Struk Thermal (58/80mm)</span>
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="py-2.5 px-3 rounded-xl bg-secondary-container/60 hover:bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            type="button"
            onClick={() =>
              window.alert(
                'Nota WhatsApp untuk #GLC-2024-0891 dikirim ke Siti Rahmawati (0812-9876-5432).',
              )
            }
          >
            <Icon name="chat" className="text-[16px] text-primary" />
            <span>Kirim Nota WA</span>
          </button>
          <button
            className="py-2.5 px-3 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface-variant text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
            type="button"
            onClick={() =>
              window.alert(
                'Transaksi #GLC-2024-0891 di-hold dan disimpan ke daftar antrian pending.',
              )
            }
          >
            <Icon name="pause_circle" className="text-[16px]" />
            <span>Hold / Pending</span>
          </button>
        </div>
      </div>
    </div>
  )
}
