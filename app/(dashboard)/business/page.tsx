import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { BusinessProfileForm } from "@/components/business/business-profile-form"

export default function BusinessProfilePage() {
  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Business Profile</h2>
        <p className="text-muted-foreground">
          Manage your business information and preferences
        </p>
      </div>
      <Separator />
      <Card>
        <CardContent className="p-6">
          <BusinessProfileForm />
        </CardContent>
      </Card>
    </div>
  )
} 