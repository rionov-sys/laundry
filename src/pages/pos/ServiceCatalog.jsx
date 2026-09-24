import { useState } from 'react'
import Icon from '../../components/Icon'
import { CATEGORIES, DURATIONS, SERVICES } from './data'

const TAB_ACTIVE =
  'px-4 py-2 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/10 whitespace-nowrap'
const TAB_IDLE =
  'px-4 py-2 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest text-on-surface-variant font-medium whitespace-nowrap transition-colors'
const CARD =
  'p-4 rounded-2xl bg-surface-container/70 hover:bg-surface-container-high/70 backdrop-blur-xl transition-all flex flex-col justify-between gap-4 group shadow-md'
const ADD_BTN =
  'px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary text-primary hover:text-on-primary font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95'

// Katalog layanan: tab kategori, selector durasi, dan tile barcode scanner
export default function ServiceCatalog({ onAdd }) {
  const [category, setCategory] = useState('Semua Layanan')
  const [durationId, setDurationId] = useState('reguler')

  const duration = DURATIONS.find((item) => item.id === durationId) ?? DURATIONS[0]
  const filtered =
    category === 'Semua Layanan'
      ? SERVICES
      : SERVICES.filter((service) => service.categories.includes(category))

  const handleAdd = (service) => {
    if (service.hasDuration) {
      onAdd({
        id: `cuci-komplit-${duration.id}`,
        name: `Cuci Komplit Kiloan (${duration.suffix})`,
        rate: duration.price,
        unit: service.unit,
      })
    } else {
      onAdd({
        id: service.id,
        name: service.orderName ?? service.name,
        rate: service.price,
        unit: service.unit,
      })
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-headline flex items-center gap-2">
            <Icon name="local_laundry_service" className="text-[16px] text-primary" />
            Katalog Layanan &amp; Paket
          </div>
          <span className="text-xs text-on-surface-variant">
            {filtered.length} Layanan Siap Transaksi
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none text-xs">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={item === category ? TAB_ACTIVE : TAB_IDLE}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
        {filtered.map((service) => {
          const price = service.hasDuration ? duration.price : service.price
          return (
            <div key={service.id} className={CARD}>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl ${service.iconClass} flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <Icon name={service.icon} className="text-[22px]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">{service.name}</h4>
                      <p className="text-[11px] text-on-surface-variant">{service.desc}</p>
                    </div>
                  </div>
                  {service.badge ? (
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${service.badge.className}`}
                    >
                      {service.badge.text}
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-on-surface-variant">
                      {service.time}
                    </span>
                  )}
                </div>
                {service.hasDuration && (
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-surface-container-lowest/80 text-[10px] text-center font-medium mt-1">
                    {DURATIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setDurationId(option.id)}
                        className={
                          option.id === durationId
                            ? 'py-1.5 px-1 rounded-lg bg-surface-container-highest text-on-surface font-semibold shadow-sm'
                            : 'py-1.5 px-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant'
                        }
                      >
                        {option.label}
                        <span className={`block text-[9px] font-normal ${option.subClass}`}>
                          {option.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase font-medium">
                    {service.rateLabel}
                  </span>
                  <div className={`text-base font-bold font-mono ${service.priceClass}`}>
                    Rp {price.toLocaleString('id-ID')}
                    <span className="text-xs text-on-surface-variant font-normal">
                      /{service.unitLabel}
                    </span>
                  </div>
                </div>
                <button
                  className={ADD_BTN}
                  type="button"
                  onClick={() => handleAdd(service)}
                >
                  <Icon name="add" className="text-[16px]" />
                  <span>Pilih Layanan</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="p-4 rounded-2xl bg-surface-container/50 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Icon name="qr_code_scanner" className="text-[20px]" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-on-surface">
              Scan Barcode Kantong / Tag Pelanggan
            </h5>
            <p className="text-[11px] text-on-surface-variant">
              Gunakan barcode scanner USB untuk input cepat bundle laundry
            </p>
          </div>
        </div>
        <button
          className="px-3 py-1.5 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-xs text-on-surface font-semibold flex items-center gap-1"
          type="button"
          onClick={() =>
            window.alert(
              'Barcode scanner siap. Arahkan laser ke tag pelanggan untuk memuat bundle laundry.',
            )
          }
        >
          <Icon name="sensors" className="text-[16px]" />
          <span>Siap Scan</span>
        </button>
      </div>
    </>
  )
}
