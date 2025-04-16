import { CallHistoryHeader } from "@/components/call-history-header"
import { CallHistoryTable } from "@/components/call-history-table"

export default function CallHistoryPage() {
  return (
    <div className="p-6 space-y-6">
      <CallHistoryHeader />
      <CallHistoryTable />
    </div>
  )
}
