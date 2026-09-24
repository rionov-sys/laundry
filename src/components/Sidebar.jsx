import Icon from './Icon'

const operationalModules = [
  { icon: 'point_of_sale', label: 'Kasir & Transaksi POS' },
  { icon: 'view_kanban', label: 'Kanban Produksi & Lacak' },
  { icon: 'group', label: 'CRM & Data Pelanggan' },
  { icon: 'monitoring', label: 'Laporan Finansial Owner', active: true },
]

const branchModules = [
  { icon: 'store', label: 'Pengaturan Mesin & Tim' },
  { icon: 'inventory_2', label: 'Stok Deterjen & Bahan' },
]

const preventNav = (event) => event.preventDefault()

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 z-40 bg-surface-container-low/80 backdrop-blur-xl flex flex-col justify-between p-4 shadow-[1px_0_12px_rgba(0,0,0,0.2)]">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-outline">
            Modul Operasional
          </div>
        </div>
        <nav className="space-y-1.5">
          {operationalModules.map((item) => (
            <a
              key={item.label}
              href="#"
              onClick={preventNav}
              aria-current={item.active ? 'page' : undefined}
              className={
                item.active
                  ? 'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-all bg-primary-container text-on-primary-container font-semibold shadow-inner'
                  : 'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all'
              }
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="pt-4">
          <div className="px-3 mb-2">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-outline">
              Manajemen Cabang
            </div>
          </div>
          <div className="space-y-1">
            {branchModules.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={preventNav}
                className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
              >
                <Icon name={item.icon} className="text-[18px]" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 rounded-xl bg-surface-container/60">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="cloud_sync" className="text-[16px] text-primary" />
          <span className="text-[11px] font-semibold text-on-surface">
            Cloud Sync Aktif
          </span>
        </div>
        <p className="text-[10px] text-on-surface-variant leading-relaxed">
          Sinkronisasi IoT timbangan &amp; mesin laundry otomatis beroperasi normal.
        </p>
      </div>
    </aside>
  )
}
