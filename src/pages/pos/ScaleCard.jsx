import Icon from '../../components/Icon'

// Unit konektor timbangan digital IoT sesuai desain
export default function ScaleCard({ scale, onTare, onInputBobot }) {
  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-surface-container/90 via-surface-container-high/60 to-surface-container/90 backdrop-blur-2xl shadow-xl shadow-black/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 relative overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-[0_0_20px_rgba(125,211,252,0.15)]">
          <Icon name="scale" className="text-[32px]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary font-headline">
              IoT Smart Scale S2-Pro
            </span>
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container-lowest px-2 py-0.5 rounded">
              COM3: 9600-8-N-1
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Timbangan terhubung secara otomatis di meja kasir depan
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 self-end md:self-center">
        <div className="flex flex-col items-end px-4 py-2 rounded-xl bg-surface-container-lowest/80 backdrop-blur-md">
          <span className="text-[9px] uppercase font-mono tracking-widest text-on-surface-variant">
            Bobot Terbaca
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold font-mono text-primary tracking-tight">
              {scale.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-on-surface-variant">Kg</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            className="px-3.5 py-2 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-xs font-medium text-on-surface flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            onClick={onTare}
            type="button"
          >
            <Icon name="restart_alt" className="text-[16px] text-primary" />
            <span>Tara / Nol</span>
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-primary text-on-primary hover:bg-primary-fixed text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-primary/20 active:scale-95"
            onClick={onInputBobot}
            type="button"
          >
            <Icon name="add_task" className="text-[16px]" />
            <span>Input Bobot</span>
          </button>
        </div>
      </div>
    </div>
  )
}
