import Icon from '../../components/Icon'

// Kartu pelanggan aktif POS (glassmorphism) sesuai desain
export default function CustomerCard() {
  return (
    <div className="p-5 rounded-2xl bg-surface-container/70 backdrop-blur-xl shadow-xl shadow-black/20 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-primary-container/60 text-primary flex items-center justify-center">
            <Icon name="person_search" className="text-[18px]" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant font-headline">
            Pelanggan Aktif POS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/50 text-[11px] font-medium text-secondary-fixed">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            ID: #CUS-8842
          </span>
          <button
            className="text-[11px] font-semibold text-primary hover:text-on-primary-container px-2 py-1 rounded-md bg-surface-container-high/50 transition-all"
            type="button"
            onClick={() =>
              window.alert(
                'Buka modul CRM & Data Pelanggan untuk mencari atau mendaftar pelanggan baru.',
              )
            }
          >
            Ganti Pelanggan
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl bg-surface-container-highest/40 backdrop-blur-md">
        <div className="md:col-span-6 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary-container to-secondary-container flex items-center justify-center text-primary font-bold text-base shadow-inner">
            SR
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-on-surface truncate">
                Siti Rahmawati
              </span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-container/60 text-tertiary text-[10px] font-semibold tracking-wide uppercase">
                VIP Member
              </span>
            </div>
            <span className="text-xs text-on-surface-variant font-mono">
              0812-9876-5432
            </span>
          </div>
        </div>
        <div className="md:col-span-3 flex flex-col justify-center px-3 py-1.5 rounded-lg bg-surface-container-low/60">
          <span className="text-[10px] text-on-surface-variant uppercase font-medium">
            Saldo Poin Loyalty
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg font-bold text-primary font-mono leading-none">
              240
            </span>
            <span className="text-[10px] text-on-surface-variant font-medium">
              pts (Rp 24.000)
            </span>
          </div>
        </div>
        <div className="md:col-span-3 flex flex-col justify-center px-3 py-1.5 rounded-lg bg-surface-container-low/60">
          <span className="text-[10px] text-tertiary uppercase font-medium flex items-center gap-1">
            <Icon name="eco" className="text-[12px]" />
            Aroma Preferensi
          </span>
          <span className="text-xs font-semibold text-on-surface mt-0.5 truncate">
            Ocean Breeze Luxury
          </span>
        </div>
        <div className="md:col-span-12 flex items-center gap-2 pt-2 text-[11px] text-on-surface-variant">
          <Icon name="info" className="text-[15px] text-error" />
          <span className="font-medium text-error-container bg-error/15 px-2 py-0.5 rounded">
            Catatan Penting:
          </span>
          <span className="truncate">
            Alergi softener lavender! Wajib bilas ekstra netral &amp; gunakan parfum
            Ocean Breeze.
          </span>
        </div>
      </div>
    </div>
  )
}
