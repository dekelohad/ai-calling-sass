"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface CallHistoryEntry {
  id: string
  date: string
  duration: string
  status: "completed" | "failed" | "in-progress"
  agent: string
}

function CallHistoryPage() {
  // TODO: Implement call history data fetching
  const mockData: CallHistoryEntry[] = [
    {
      id: "1",
      date: "2024-04-17 10:00",
      duration: "5:23",
      status: "completed",
      agent: "Sales Agent 1"
    },
    {
      id: "2",
      date: "2024-04-17 11:15",
      duration: "3:45",
      status: "failed",
      agent: "Support Agent 2"
    },
    {
      id: "3",
      date: "2024-04-17 14:30",
      duration: "7:12",
      status: "in-progress",
      agent: "Sales Agent 1"
    }
  ]

  const getStatusBadge = (status: CallHistoryEntry["status"]) => {
    const variants = {
      completed: "default",
      failed: "destructive",
      "in-progress": "secondary"
    } as const

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Call History</CardTitle>
          <CardDescription>View your recent call history and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{call.date}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>{getStatusBadge(call.status)}</TableCell>
                  <TableCell>{call.agent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CallHistoryPage
