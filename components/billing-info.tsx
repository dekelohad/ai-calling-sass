import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BillingInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">Free Trial</h3>
              <p className="text-muted-foreground">$0.00/month</p>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Remaining:</span>
                <span className="text-sm font-medium">$10.00</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
              </div>
            </div>
            <Button className="w-full bg-black text-white hover:bg-black/90">Upgrade Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">No payment method added yet</p>
            <Button variant="outline" className="w-full">
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
