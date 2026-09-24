// Daily income vs expense trend chart — SVG copied 1:1 from the design (JSX attribute names)
const EXPENSE_BARS = [
  { x: 25, y: 130, h: 50 },
  { x: 75, y: 115, h: 65 },
  { x: 125, y: 140, h: 40 },
  { x: 175, y: 110, h: 70 },
  { x: 225, y: 100, h: 80 },
  { x: 275, y: 135, h: 45 },
  { x: 325, y: 90, h: 90 },
  { x: 375, y: 125, h: 55 },
  { x: 425, y: 140, h: 40 },
  { x: 475, y: 105, h: 75 },
  { x: 525, y: 85, h: 95 },
  { x: 575, y: 130, h: 50 },
  { x: 625, y: 75, h: 105 },
  { x: 665, y: 120, h: 60 },
]

const X_LABELS = [
  '01 Mei',
  '05 Mei',
  '10 Mei',
  '15 Mei',
  '20 Mei',
  '25 Mei',
  '31 Mei (Hari Ini)',
]

const HIGHLIGHTS = [
  {
    label: 'Hari Tertinggi',
    title: 'Sabtu, 24 Mei',
    value: 'Rp 2.890.000',
    valueClass: 'text-primary',
  },
  {
    label: 'Beban Terbesar',
    title: 'Gaji Operator & Listrik',
    value: 'Rp 7.450.000 (Tgl 25)',
    valueClass: 'text-secondary',
  },
  {
    label: 'Efisiensi Bahan',
    title: '94.2% Optimal',
    value: '+3.1% dari target',
    valueClass: 'text-tertiary',
  },
]

export default function TrendChart() {
  return (
    <div className="lg:col-span-8 p-6 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-on-surface tracking-tight">
            Tren Pemasukan vs Pengeluaran Harian
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Analisis arus kas harian siklus Mei 2025 (Rata-rata omzet Rp 1.57M/hari)
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-primary"></span>
            <span className="text-on-surface">Pemasukan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-secondary"></span>
            <span className="text-on-surface-variant">Beban/Expense</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-tertiary"></span>
            <span className="text-tertiary">Net Margin</span>
          </div>
        </div>
      </div>
      <div className="w-full h-64 relative flex flex-col justify-end">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 700 220"
        >
          <defs>
            <linearGradient id="primaryGlow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line stroke="#202c42" strokeWidth="1" x1="0" x2="700" y1="180" y2="180" />
          <line
            stroke="#202c42"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0"
            x2="700"
            y1="120"
            y2="120"
          />
          <line
            stroke="#202c42"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0"
            x2="700"
            y1="60"
            y2="60"
          />
          <g fill="#202c42" opacity="0.6">
            {EXPENSE_BARS.map((bar) => (
              <rect
                key={bar.x}
                fill="#88b4cc"
                height={bar.h}
                rx="3"
                width="18"
                x={bar.x}
                y={bar.y}
              />
            ))}
          </g>
          <path
            d="M 25 180 L 25 75 Q 75 40 125 90 T 225 35 T 325 50 T 425 80 T 525 25 T 625 15 L 665 40 L 665 180 Z"
            fill="url(#primaryGlow)"
          />
          <path
            d="M 25 75 Q 75 40 125 90 T 225 35 T 325 50 T 425 80 T 525 25 T 625 15 L 665 40"
            fill="none"
            stroke="#7dd3fc"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle cx="225" cy="35" fill="#7dd3fc" r="4.5" />
          <circle cx="525" cy="25" fill="#7dd3fc" r="4.5" />
          <circle cx="625" cy="15" fill="#e8d0ff" r="5" />
        </svg>
        <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant pt-2">
          {X_LABELS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-surface-container-highest">
        {HIGHLIGHTS.map((item) => (
          <div key={item.label} className="p-3 rounded-lg bg-surface-container-low/70">
            <span className="text-[10px] text-on-surface-variant block uppercase font-mono">
              {item.label}
            </span>
            <span className="text-sm font-bold text-on-surface">{item.title}</span>
            <span className={`text-xs font-mono block ${item.valueClass}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
