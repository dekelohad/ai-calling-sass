import { BillingHeader } from "@/components/billing-header"
import { BillingInfo } from "@/components/billing-info"

export default function BillingPage() {
  return (
    <div className="p-6 space-y-6">
      <BillingHeader />
      <BillingInfo />
    </div>
  )
}
