import { useState } from 'react'
import Icon from './Icon'

const PERIODS = ['Hari Ini', '7 Hari Terakhir', 'Bulan Ini (Mei 2025)', 'Custom']

const BRANCHES = [
  'Cabang Sudirman Utama (Live)',
  'Semua Cabang (Sudirman, Thamrin, Kuningan)',
  'Cabang Thamrin Plaza',
  'Cabang Kuningan Hub',
]

const REPORT_ROWS = [
  ['Laporan Finansial Owner - Glacier Laundry', ''],
  ['Periode', 'Bulan Ini (Mei 2025)'],
  ['Cabang', 'Cabang Sudirman Utama'],
  [],
  ['Metrik', 'Nilai'],
  ['Total Omzet Bruto', 'Rp 48.750.000'],
  ['Beban Operasional', 'Rp 18.200.000'],
  ['Estimasi Laba Bersih', 'Rp 30.550.000'],
  ['Piutang Belum Lunas', 'Rp 2.450.000'],
  ['Rasio Biaya', '37.4% dari omzet'],
  ['Margin Laba Bersih', '62.6%'],
  ['Fisik Kas di Drawer', 'Rp 3.420.000'],
  ['Total Nota Selesai', '1.248'],
]

function downloadExcelReport(period, branch) {
  const rows = REPORT_ROWS.map((row, index) => {
    if (index === 1) return [row[0], period]
    if (index === 2) return [row[0], branch]
    return row
  })
  const csv = rows.map((row) => row.join(';')).join('\r\n')
  const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'laporan-finansial-owner-mei-2025.csv'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

export default function Toolbar() {
  const [period, setPeriod] = useState('Bulan Ini (Mei 2025)')
  const [branch, setBranch] = useState(BRANCHES[0])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-container/60 backdrop-blur-xl shadow-lg">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex p-1 rounded-lg bg-surface-container-high/80">
          {PERIODS.map((item) => {
            const isActive = period === item
            const baseClasses = isActive
              ? 'px-3.5 py-1.5 rounded text-xs font-semibold bg-primary-container text-on-primary-container shadow-sm'
              : 'px-3 py-1.5 rounded text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors'
            if (item === 'Custom') {
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`${baseClasses} flex items-center gap-1.5`}
                >
                  <span>Custom</span>
                  <Icon name="calendar_today" className="text-[14px]" />
                </button>
              )
            }
            return (
              <button
                key={item}
                type="button"
                onClick={() => setPeriod(item)}
                className={baseClasses}
              >
                {item}
              </button>
            )
          })}
        </div>
        <div className="relative">
          <select
            aria-label="Pilih cabang"
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium bg-surface-container-high/80 text-on-surface focus:outline-none cursor-pointer"
          >
            {BRANCHES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <Icon
            name="expand_more"
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-on-surface-variant"
          />
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-medium transition-all shadow-sm"
          type="button"
          onClick={() => downloadExcelReport(period, branch)}
        >
          <Icon name="table_view" className="text-[16px] text-secondary" />
          <span>Unduh Excel</span>
        </button>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-medium transition-all shadow-sm"
          type="button"
          onClick={() => window.print()}
        >
          <Icon name="picture_as_pdf" className="text-[16px] text-tertiary" />
          <span>Ekspor PDF</span>
        </button>
        <button
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-fixed-dim text-on-primary text-xs font-semibold transition-all shadow-md"
          type="button"
          onClick={() =>
            window.alert(
              `Rekonsiliasi kas dijalankan untuk ${branch}.\nKas fisik vs sistem: selisih Rp 0 (Aman).`,
            )
          }
        >
          <Icon name="sync_alt" className="text-[16px]" />
          <span>Rekonsiliasi Kas</span>
        </button>
      </div>
    </div>
  )
}
