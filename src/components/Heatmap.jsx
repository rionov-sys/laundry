import Icon from './Icon'

const DAYS = [
  { label: 'Senin' },
  { label: 'Selasa' },
  { label: 'Rabu' },
  { label: 'Kamis' },
  { label: 'Jumat' },
  { label: 'Sabtu ★', peak: true },
  { label: 'Minggu ★', peak: true },
]

// Full class literals taken verbatim from the design so frequency colors match exactly
const TONES = {
  s30v: 'bg-secondary-container/30 text-on-surface-variant text-[10px]',
  s40v: 'bg-secondary-container/40 text-on-surface-variant text-[10px]',
  s50v: 'bg-secondary-container/50 text-on-surface-variant text-[10px]',
  s40: 'bg-secondary-container/40 text-on-surface text-[10px]',
  s50: 'bg-secondary-container/50 text-on-surface text-[10px]',
  s60: 'bg-secondary-container/60 text-on-surface text-[10px]',
  s70: 'bg-secondary-container/70 text-on-surface text-[10px]',
  s80: 'bg-secondary-container/80 text-on-surface text-[10px]',
  low: 'bg-surface-container-high text-on-surface-variant text-[10px]',
  p70: 'bg-primary-container/70 text-on-surface font-semibold text-[10px]',
  ramai: 'bg-primary-container text-on-primary-container font-semibold text-[10px]',
  p60t: 'bg-primary-container/60 text-on-primary-container text-[10px]',
  p70t: 'bg-primary-container/70 text-on-primary-container font-semibold text-[10px]',
  p80t: 'bg-primary-container/80 text-on-primary-container font-semibold text-[10px]',
  p90t: 'bg-primary-container/90 text-on-primary-container font-semibold text-[10px]',
  peak: 'bg-primary text-on-primary font-bold text-[11px] shadow-sm',
}

const ROWS = [
  {
    slot: '07:00 - 10:00',
    cells: [
      { v: 8, t: 's40v' },
      { v: 6, t: 's30v' },
      { v: 9, t: 's50v' },
      { v: 7, t: 's40v' },
      { v: 14, t: 'p70' },
      { v: 34, t: 'peak' },
      { v: 38, t: 'peak' },
    ],
  },
  {
    slot: '10:00 - 13:00',
    cells: [
      { v: 12, t: 's70' },
      { v: 11, t: 's60' },
      { v: 10, t: 's50' },
      { v: 13, t: 's70' },
      { v: 18, t: 'ramai' },
      { v: 29, t: 'peak' },
      { v: 31, t: 'peak' },
    ],
  },
  {
    slot: '13:00 - 16:00',
    cells: [
      { v: 5, t: 'low' },
      { v: 7, t: 's30v' },
      { v: 6, t: 's40v' },
      { v: 5, t: 'low' },
      { v: 12, t: 's80' },
      { v: 19, t: 'ramai' },
      { v: 22, t: 'ramai' },
    ],
  },
  {
    slot: '16:00 - 19:00',
    cells: [
      { v: 16, t: 'p80t' },
      { v: 15, t: 'p70t' },
      { v: 17, t: 'p80t' },
      { v: 18, t: 'p90t' },
      { v: 26, t: 'peak' },
      { v: 36, t: 'peak' },
      { v: 41, t: 'peak' },
    ],
  },
  {
    slot: '19:00 - 22:00',
    cells: [
      { v: 9, t: 's50' },
      { v: 10, t: 's60' },
      { v: 8, t: 's40v' },
      { v: 11, t: 's70' },
      { v: 14, t: 'p60t' },
      { v: 18, t: 'p90t' },
      { v: 13, t: 's80' },
    ],
  },
]

const FREQUENCY = [
  { cls: 'bg-surface-container-high', title: 'Rendah' },
  { cls: 'bg-secondary-container', title: 'Sedang' },
  { cls: 'bg-primary-container', title: 'Ramai' },
  { cls: 'bg-primary', title: 'Puncak Sibuk' },
]

export default function Heatmap() {
  return (
    <div className="p-6 rounded-xl bg-surface-container/70 backdrop-blur-2xl shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-on-surface tracking-tight">
            Heatmap Intensitas Transaksi &amp; Jam Sibuk
          </h2>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Membantu optimasi penjadwalan shift operator cuci &amp; pengeringan mesin
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-on-surface-variant">Frekuensi:</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            {FREQUENCY.map((item) => (
              <span
                key={item.title}
                className={`w-3.5 h-3.5 rounded-sm ${item.cls}`}
                title={item.title}
              ></span>
            ))}
            <span className="text-on-surface pl-1">Puncak Padat</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-2 text-center text-xs">
        <div className="text-[11px] font-mono text-on-surface-variant text-left self-center">
          Jam / Hari
        </div>
        {DAYS.map((day) => (
          <div
            key={day.label}
            className={
              day.peak ? 'font-semibold text-primary' : 'font-medium text-on-surface'
            }
          >
            {day.label}
          </div>
        ))}
        {ROWS.map((row) => (
          <div key={row.slot} className="contents">
            <div className="text-[10px] font-mono text-on-surface-variant text-left self-center">
              {row.slot}
            </div>
            {row.cells.map((cell, index) => (
              <div
                key={`${row.slot}-${DAYS[index].label}`}
                className={`h-8 rounded flex items-center justify-center ${TONES[cell.t]}`}
              >
                {cell.v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-lg bg-surface-container-low/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Icon name="lightbulb" className="text-[16px] text-primary" />
          <span>
            Rekomendasi AI: Tambahkan 1 shift packer &amp; setrika pada{' '}
            <strong className="text-on-surface">Sabtu 08:00 - 12:00</strong> untuk
            mengurangi bottleneck cuci kilat.
          </span>
        </div>
        <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">
          Utilisasi 91%
        </span>
      </div>
    </div>
  )
}
