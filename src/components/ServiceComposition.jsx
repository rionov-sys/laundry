const SERVICES = [
  {
    name: 'Kiloan Reguler',
    pct: 44,
    amount: 'Rp 21.4M',
    dotClass: 'bg-primary',
    color: '#7dd3fc',
  },
  {
    name: 'Kiloan Express',
    pct: 28,
    amount: 'Rp 13.6M',
    dotClass: 'bg-primary-container',
    color: '#0e4d6e',
  },
  {
    name: 'Bedcover & Karpet',
    pct: 15,
    amount: 'Rp 7.3M',
    dotClass: 'bg-tertiary',
    color: '#c8a0f0',
  },
  {
    name: 'Sepatu & Tas Premium',
    pct: 8,
    amount: 'Rp 3.9M',
    dotClass: 'bg-secondary',
    color: '#88b4cc',
  },
  {
    name: 'Dry Clean Suit & Gaun',
    pct: 5,
    amount: 'Rp 2.4M',
    dotClass: 'bg-tertiary-fixed',
    color: '#e8d0ff',
  },
]

// Circumference of the donut track (r = 38) ≈ 238.76
const CIRCUMFERENCE = 2 * Math.PI * 38

function buildSegments() {
  let offset = 0
  return SERVICES.map((service) => {
    const length = (CIRCUMFERENCE * service.pct) / 100
    const segment = { ...service, length, offset }
    offset += length
    return segment
  })
}

const SEGMENTS = buildSegments()

export default function ServiceComposition() {
  return (
    <div className="lg:col-span-4 p-6 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-on-surface tracking-tight">
            Komposisi Layanan
          </h2>
          <span className="text-[11px] text-on-surface-variant font-mono">
            5 Kategori
          </span>
        </div>
        <div className="flex items-center justify-center my-4 relative">
          <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              fill="transparent"
              r="38"
              stroke="#1a2438"
              strokeWidth="12"
            />
            {SEGMENTS.map((segment) => (
              <circle
                key={segment.name}
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke={segment.color}
                strokeDasharray={`${segment.length} ${CIRCUMFERENCE}`}
                strokeDashoffset={-segment.offset}
                strokeWidth="12"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-mono text-on-surface-variant">
              Total Nota
            </span>
            <span className="text-xl font-bold text-on-surface">1.248</span>
            <span className="text-[9px] text-primary">Pesanan Selesai</span>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${service.dotClass}`}></span>
                <span className="text-on-surface">{service.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-on-surface font-semibold">{service.pct}%</span>
                <span className="text-on-surface-variant text-[11px] font-mono">
                  {service.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-surface-container-highest flex items-center justify-between text-[11px]">
        <span className="text-on-surface-variant">Layanan Profit Tertinggi:</span>
        <span className="text-tertiary font-medium">
          Sepatu &amp; Tas (Margin 78%)
        </span>
      </div>
    </div>
  )
}
