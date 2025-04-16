import { PhoneNumbersHeader } from "@/components/phone-numbers-header"
import { PhoneNumbersList } from "@/components/phone-numbers-list"

export default function PhoneNumbersPage() {
  return (
    <div className="p-6 space-y-6">
      <PhoneNumbersHeader />
      <PhoneNumbersList />
    </div>
  )
}
