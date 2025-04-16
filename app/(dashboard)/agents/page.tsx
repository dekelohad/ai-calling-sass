import { AgentsTable } from "@/components/agents-table"
import { AgentsHeader } from "@/components/agents-header"

export default function AgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <AgentsHeader />
      <AgentsTable />
    </div>
  )
}
