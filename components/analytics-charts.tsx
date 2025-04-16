import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Clock } from "lucide-react"
import { ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendItem } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for charts
const callCountsData = [
  { name: "Mon", count: 12 },
  { name: "Tue", count: 19 },
  { name: "Wed", count: 15 },
  { name: "Thu", count: 27 },
  { name: "Fri", count: 32 },
  { name: "Sat", count: 14 },
  { name: "Sun", count: 8 },
]

const successRateData = [
  { name: "Mon", success: 92, failed: 8 },
  { name: "Tue", success: 95, failed: 5 },
  { name: "Wed", success: 88, failed: 12 },
  { name: "Thu", success: 96, failed: 4 },
  { name: "Fri", success: 94, failed: 6 },
  { name: "Sat", success: 91, failed: 9 },
  { name: "Sun", success: 93, failed: 7 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Call Counts</h3>
              <p className="text-sm text-muted-foreground">All agents</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={callCountsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{label}</div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                            <span>Calls: {payload[0].value}</span>
                          </div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Call Successful</h3>
              <p className="text-sm text-muted-foreground">All agents</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={successRateData} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent>
                          <div className="font-medium">{label}</div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                            <span>Success: {payload[0].value}%</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                            <span>Failed: {payload[1].value}%</span>
                          </div>
                        </ChartTooltipContent>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="success" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <ChartLegend>
              <ChartLegendItem color="#22c55e" label="Success" />
              <ChartLegendItem color="#ef4444" label="Failed" />
            </ChartLegend>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
