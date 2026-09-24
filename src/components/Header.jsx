import { useEffect, useState } from 'react'
import Icon from './Icon'

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida/AEtjO1VRQyiBgSZfxJ5O37Qvy9vurw8KIocdrI8k7ckqJFTKOaK7pg0c9a8Y1lnyLNn1bmn8Lf0sm49EXla2trlaISn5F71B3OxUgU1DzWuUHNQ4B3GQlhlxaMAdkpiDh_KimImRSZ2V90XSGO_pJlDOeJW6MZmN0idRHtJoFm07uzwAnQvLv5kXwW4RZFH-3My86G2Hzts2Xrj19uZfYRhSVRxERX70EcotldM1x8qIGyZYYAYLx5s9pkwECVg'
const AVATAR_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAzb3DZYbDlibbHGlvtwaf3E2o7uwQplmXmdMDfrE3cw3FSUXkcru_CPKrSMUXuLi_SgWgaeDLVQoZUVOJKHMQwRBiM6DTPdkLDqvLMBqfnUl46_9ji5-UIBsEnVtJPN_VbwbfudIyCQqaUxiQcC9sXRRsg_88CcAOENcvXqjnmcoOY1-ZHBzUfhOt2CSj6GTGGCvsMfb6rzUrJHtEQ-t4Q9Cxq1TlQNqpcx9NshQJZveTEf4Fm5Vcw'

function formatWib(date) {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
  return `${time} WIB`
}

export default function Header() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/75 backdrop-blur-2xl shadow-[0_1px_12px_rgba(0,0,0,0.3)] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            alt="Glacier Laundry Logo"
            className="h-8 w-auto object-contain"
            src={LOGO_SRC}
          />
          <div className="flex flex-col">
            <span className="text-xs font-headline font-bold tracking-wider text-primary uppercase">
              Glacier Laundry
            </span>
            <span className="text-[10px] text-on-surface-variant font-medium tracking-tight">
              Enterprise Suite v4.2
            </span>
          </div>
        </div>
        <div className="h-5 w-px bg-surface-container-highest"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container/70 text-on-surface text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-on-surface">Cabang Sudirman Utama</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-semibold tracking-wide uppercase">
            Live
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low/60 text-xs text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span>Server Online</span>
          <span className="text-outline">|</span>
          <span>99.98% Uptime</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-on-surface-variant bg-surface-container-low/40 px-3 py-1 rounded-lg">
          <Icon name="schedule" className="text-[15px] text-primary" />
          <span>{formatWib(now)}</span>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container/60 hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant text-xs transition-colors"
          type="button"
          onClick={() =>
            window.alert(
              'Pencarian global belum tersedia pada demo desain ini.\nGunakan pintasan keyboard ⌘K / Ctrl+K pada aplikasi penuh.',
            )
          }
        >
          <Icon name="search" className="text-[16px]" />
          <span className="hidden sm:inline">Pencarian global...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-surface-container-highest text-on-surface-variant">
            ⌘K
          </kbd>
        </button>
        <div className="relative">
          <button
            aria-label="Notifikasi pesanan"
            className="p-2 rounded-lg bg-surface-container/60 hover:bg-surface-container-high hover:text-on-surface text-on-surface-variant transition-colors relative flex items-center justify-center"
            type="button"
            onClick={() =>
              window.alert(
                'Notifikasi: 3 pesanan menunggu konfirmasi & 18 nota piutang belum lunas.',
              )
            }
          >
            <Icon name="notifications" className="text-[20px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
          </button>
        </div>
        <div className="h-6 w-px bg-surface-container-highest"></div>
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden lg:block">
            <div className="text-xs font-medium text-on-surface leading-tight">
              Bambang Pratama
            </div>
            <div className="text-[10px] text-primary font-medium">Owner / Admin</div>
          </div>
          <div className="relative ring-1 ring-primary/30 rounded-full p-0.5">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={AVATAR_SRC}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
