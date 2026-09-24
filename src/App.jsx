import { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import PosPage from './pages/PosPage'
import FinansialPage from './pages/FinansialPage'

const PAGES = ['pos', 'finansial']

function readHashPage() {
  const hash = window.location.hash.replace('#', '')
  return PAGES.includes(hash) ? hash : 'pos'
}

export default function App() {
  const [page, setPage] = useState(readHashPage)

  useEffect(() => {
    const onHashChange = () => setPage(readHashPage())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title =
      page === 'pos'
        ? 'Kasir & Transaksi POS — Glacier Laundry'
        : 'Laporan Finansial Owner — Glacier Laundry'
  }, [page])

  const navigate = (path) => {
    setPage(path)
    window.location.hash = path
  }

  return (
    <>
      <Header />
      <Sidebar activePath={page} onNavigate={navigate} />
      <div className="pl-64">
        <main className="relative pt-16 min-h-screen bg-background w-full px-8 pb-12">
          <div className="flex flex-col w-full">
            {page === 'pos' ? <PosPage /> : <FinansialPage />}
          </div>
        </main>
      </div>
    </>
  )
}
