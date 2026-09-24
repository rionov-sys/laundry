import Icon from './Icon'

const METRICS = [
  {
    icon: 'speed',
    wrapperClass: 'bg-primary-container/40 text-primary',
    label: 'Kecepatan Turnaround Rata-rata',
    value: '18.4 Jam',
    highlight: '(-3.2 jam)',
    highlightClass: 'text-primary',
    note: 'Sangat cepat melampaui SLA 24 jam',
  },
  {
    icon: 'repeat',
    wrapperClass: 'bg-tertiary-container/40 text-tertiary',
    label: 'Repeat Customer Rate',
    value: '71.8%',
    highlight: '(896 Pelanggan)',
    highlightClass: 'text-tertiary',
    note: 'Loyalitas tinggi via program member CRM',
  },
  {
    icon: 'devices_wearables',
    wrapperClass: 'bg-secondary-container/40 text-secondary',
    label: 'Kesehatan Mesin & Uptime IoT',
    value: '12 / 12 Aktif',
    highlight: '(100%)',
    highlightClass: 'text-secondary',
    note: 'Semua washer & dryer berjalan optimal',
  },
]

export default function OperationalMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {METRICS.map((metric) => (
        <div
          key={metric.label}
          className="p-4 rounded-xl bg-surface-container/60 backdrop-blur-xl flex items-center gap-4"
        >
          <div className={`p-3 rounded-xl ${metric.wrapperClass}`}>
            <Icon name={metric.icon} className="text-[24px]" />
          </div>
          <div>
            <div className="text-xs text-on-surface-variant">{metric.label}</div>
            <div className="text-lg font-bold text-on-surface font-mono">
              {metric.value}{' '}
              <span className={`text-xs font-normal ${metric.highlightClass}`}>
                {metric.highlight}
              </span>
            </div>
            <div className="text-[10px] text-on-surface-variant">{metric.note}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
