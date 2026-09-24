import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import KpiCards from './components/KpiCards'
import TrendChart from './components/TrendChart'
import ServiceComposition from './components/ServiceComposition'
import Heatmap from './components/Heatmap'
import StockAlerts from './components/StockAlerts'
import CashLog from './components/CashLog'
import OperationalMetrics from './components/OperationalMetrics'

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="pl-64">
        <main className="relative pt-16 min-h-screen bg-background w-full px-8 pb-12">
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-8 pb-10">
              <Toolbar />
              <KpiCards />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <TrendChart />
                <ServiceComposition />
              </div>
              <Heatmap />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <StockAlerts />
                <CashLog />
              </div>
              <OperationalMetrics />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
