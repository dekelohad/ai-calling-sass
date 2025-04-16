import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Clock, Zap } from "lucide-react"

// Mock data for analytics
const analyticsData = {
  callCounts: 127,
  callDuration: "3h 42m",
  callLatency: "320ms",
  successRate: "94%",
}

export function AnalyticsCards() {
  const cards = [
    {
      title: "Call Counts",
      subtitle: "All agents",
      value: analyticsData.callCounts.toString(),
      icon: <BarChart3 className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Call Duration",
      subtitle: "All agents",
      value: analyticsData.callDuration,
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Call Latency",
      subtitle: "All agents",
      value: analyticsData.callLatency,
      icon: <Zap className="h-5 w-5 text-muted-foreground" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              {card.icon}
              <div>
                <h3 className="font-medium">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
              </div>
            </div>
            <p className="text-3xl font-semibold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
