import Icon from './Icon'

export default function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Omzet Bruto */}
      <div className="relative overflow-hidden p-5 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            Total Omzet Bruto
          </span>
          <div className="p-2 rounded-lg bg-primary-container/40 text-primary">
            <Icon name="payments" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-on-surface">
            Rp 48.750.000
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="flex items-center text-xs font-semibold text-primary">
              <Icon name="trending_up" className="text-[14px]" />
              +14.2%
            </span>
            <span className="text-[11px] text-on-surface-variant font-mono">
              MoM vs Apr 2025
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-on-surface-variant">
          <span>Target Mei: 85% tercapai</span>
          <span className="font-mono text-on-surface">Rp 57.0M</span>
        </div>
      </div>

      {/* Beban Operasional */}
      <div className="relative overflow-hidden p-5 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            Beban Operasional
          </span>
          <div className="p-2 rounded-lg bg-secondary-container/50 text-secondary">
            <Icon name="account_balance_wallet" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-on-surface">
            Rp 18.200.000
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs font-semibold text-on-surface-variant font-mono">
              Bahan + Listrik + Gaji + Sewa
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px]">
          <span className="text-on-surface-variant">Rasio Biaya</span>
          <span className="font-mono font-medium text-secondary">
            37.4% dari omzet
          </span>
        </div>
      </div>

      {/* Estimasi Laba Bersih */}
      <div className="relative overflow-hidden p-5 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Estimasi Laba Bersih
          </span>
          <div className="p-2 rounded-lg bg-primary-container text-on-primary-container">
            <Icon name="insights" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-primary">
            Rp 30.550.000
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary/20 text-primary">
              Margin 62.6%
            </span>
            <span className="text-[11px] text-on-surface-variant font-mono">
              Sangat Sehat
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-on-surface-variant">
          <span>EBITDA Margin</span>
          <span className="font-mono text-primary font-semibold">66.1%</span>
        </div>
      </div>

      {/* Piutang Belum Lunas */}
      <div className="relative overflow-hidden p-5 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-error uppercase tracking-wider">
            Piutang Belum Lunas
          </span>
          <div className="p-2 rounded-lg bg-error-container/60 text-error">
            <Icon name="receipt_long" />
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold tracking-tight text-on-surface">
            Rp 2.450.000
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs font-semibold text-error">
              18 Nota Transaksi
            </span>
            <span className="text-[11px] text-on-surface-variant font-mono">
              Kemitraan &amp; COD
            </span>
          </div>
        </div>
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px]">
          <a
            className="text-primary hover:underline flex items-center gap-1"
            href="#"
            onClick={(event) => {
              event.preventDefault()
              window.alert(
                'Reminder WhatsApp untuk 18 nota piutang (Rp 2.450.000) berhasil dikirim ke pelanggan!',
              )
            }}
          >
            <span>Kirim Reminder WA</span>
            <Icon name="arrow_forward" className="text-[13px]" />
          </a>
          <span className="text-[10px] text-on-surface-variant font-mono">
            Max 7 hari
          </span>
        </div>
      </div>
    </div>
  )
}
