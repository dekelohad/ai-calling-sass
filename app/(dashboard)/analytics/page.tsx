import { AnalyticsHeader } from "@/components/analytics-header"
import { AnalyticsCards } from "@/components/analytics-cards"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <AnalyticsHeader />
      <AnalyticsCards />
      <AnalyticsCharts />
    </div>
  )
}
