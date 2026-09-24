import Icon from './Icon'

const LEDGER = [
  {
    icon: 'arrow_downward',
    iconClass: 'bg-primary-container text-on-primary-container',
    title: 'Penerimaan Kasir POS (Shift Pagi)',
    meta: '14:15 WIB • Kasir: Rani Oktavia • QRIS & Tunai',
    amount: '+Rp 2.140.000',
    amountClass: 'text-primary',
    category: 'Pemasukan',
  },
  {
    icon: 'bolt',
    iconClass: 'bg-secondary-container text-secondary',
    title: 'Token Listrik PLN 3-Phase Outlet',
    meta: '11:02 WIB • Auto-Debit BCA Bisnis • Mesin Dryer Industri',
    amount: '-Rp 750.000',
    amountClass: 'text-on-surface',
    category: 'Utilitas',
  },
  {
    icon: 'local_shipping',
    iconClass: 'bg-secondary-container text-secondary',
    title: 'Pembelian Deterjen Pabrik Drum 60L',
    meta: 'Kemarin 16:30 WIB • PT Kimia Sentosa • Faktur #INV-9921',
    amount: '-Rp 1.150.000',
    amountClass: 'text-on-surface',
    category: 'Persediaan',
  },
  {
    icon: 'badge',
    iconClass: 'bg-tertiary-container text-on-tertiary-container',
    title: 'Uang Lembur Shift Malam Operator Cuci',
    meta: 'Kemarin 21:00 WIB • Tunai Kas Kecil • 3 Petugas',
    amount: '-Rp 350.000',
    amountClass: 'text-on-surface',
    category: 'Payroll/SDM',
  },
]

function closeRegister() {
  const confirmed = window.confirm(
    'Konfirmasi Tutup Kasir Harian senilai Rp 3.420.000 untuk Cabang Sudirman Utama?',
  )
  if (confirmed) {
    window.alert(
      'Kas fisik berhasil ditutup dan slip rekonsiliasi telah dikirim ke WhatsApp Owner!',
    )
  }
}

export default function CashLog() {
  return (
    <div className="lg:col-span-7 p-6 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-on-surface tracking-tight">
              Log Arus Kas Terkini (Real-time Cashflow)
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Audit trail transaksi masuk &amp; keluar Cabang Sudirman
            </p>
          </div>
          <a
            className="text-xs text-primary hover:underline font-medium"
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            Lihat Semua Ledger
          </a>
        </div>
        <div className="space-y-2.5">
          {LEDGER.map((entry) => (
            <div
              key={entry.title}
              className="p-3 rounded-lg bg-surface-container-high/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${entry.iconClass}`}>
                  <Icon name={entry.icon} className="text-[18px]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-on-surface">
                    {entry.title}
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-mono">
                    {entry.meta}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-bold font-mono ${entry.amountClass}`}>
                  {entry.amount}
                </div>
                <div className="text-[10px] text-on-surface-variant">
                  {entry.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-surface-container-highest flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="point_of_sale" className="text-[18px] text-primary" />
          <span className="text-xs text-on-surface">Fisik Kas di Drawer Saat Ini:</span>
          <span className="font-mono text-sm font-bold text-primary">Rp 3.420.000</span>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary text-xs font-semibold shadow-md flex items-center gap-2 transition-all"
          type="button"
          onClick={closeRegister}
        >
          <Icon name="lock_clock" className="text-[16px]" />
          <span>Tutup Kasir Harian &amp; Setor Kas</span>
        </button>
      </div>
    </div>
  )
}
