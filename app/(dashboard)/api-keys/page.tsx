import { ApiKeysHeader } from "@/components/api-keys-header"
import { ApiKeysTable } from "@/components/api-keys-table"

export default function ApiKeysPage() {
  return (
    <div className="p-6 space-y-6">
      <ApiKeysHeader />
      <ApiKeysTable />
    </div>
  )
}
