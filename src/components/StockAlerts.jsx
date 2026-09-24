import Icon from './Icon'

const CRITICAL_ITEMS = [
  {
    name: 'Deterjen Liquid Oxi-Clean Premium',
    stock: '4.5 / 50 Liter',
    level: 9,
    minimum: 'Batas minimum: 10 Liter',
    estimate: 'Estimasi habis dalam 1.5 hari',
    vendor: 'PT Kimia Sentosa Abadi',
    action: 'Order Restock 20L',
    alert:
      'Order restock "Deterjen Liquid Oxi-Clean Premium" 20L telah dikirim ke PT Kimia Sentosa Abadi.',
  },
  {
    name: 'Plastik Packing Seal 35x50 (Baju Kiloan)',
    stock: '1 / 15 Roll',
    level: 7,
    minimum: 'Batas minimum: 3 Roll',
    estimate: 'Habis malam ini',
    vendor: 'Mega Plastik Cemerlang',
    action: 'Order Restock 5 Roll',
    alert:
      'Order restock "Plastik Packing Seal 35x50" 5 roll telah dikirim ke Mega Plastik Cemerlang.',
  },
]

export default function StockAlerts() {
  return (
    <div className="lg:col-span-5 p-6 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="warning" className="text-[20px] text-error" />
            <h2 className="text-base font-bold text-on-surface tracking-tight">
              Peringatan Stok Kritis (Bahan Baku)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-error font-medium">
            2 Perlu Restock Segera
          </span>
        </div>
        <div className="space-y-3">
          {CRITICAL_ITEMS.map((item) => (
            <div key={item.name} className="p-3.5 rounded-lg bg-surface-container-high/80">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-on-surface">{item.name}</span>
                <span className="text-xs font-mono text-error font-bold">{item.stock}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                <div
                  className="h-full bg-error rounded-full"
                  style={{ width: `${item.level}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] text-on-surface-variant">
                <span>{item.minimum}</span>
                <span className="text-error">{item.estimate}</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] text-on-surface-variant">
                  Vendor: {item.vendor}
                </span>
                <button
                  className="px-2.5 py-1 rounded text-[11px] font-medium bg-primary text-on-primary hover:bg-primary-fixed-dim transition-all"
                  type="button"
                  onClick={() => window.alert(item.alert)}
                >
                  {item.action}
                </button>
              </div>
            </div>
          ))}
          <div className="p-3.5 rounded-lg bg-surface-container-low/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-surface-container-high text-primary">
                <Icon name="verified" className="text-[18px]" />
              </div>
              <div>
                <div className="text-xs font-medium text-on-surface">
                  Parfum Soft Lavender &amp; Softener
                </div>
                <div className="text-[10px] text-on-surface-variant font-mono">
                  Stok Aman: 22.5 Liter (Cukup 18 hari)
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-primary font-bold">OK</span>
          </div>
        </div>
      </div>
      <div className="mt-5 p-3 rounded-lg bg-surface-container-low text-[11px] text-on-surface-variant flex items-center justify-between">
        <span>Total Biaya Restock Direkomendasikan:</span>
        <span className="font-mono font-bold text-on-surface">Rp 820.000</span>
      </div>
    </div>
  )
}
