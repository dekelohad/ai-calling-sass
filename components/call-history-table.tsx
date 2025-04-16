"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Download, ExternalLink, Play, Pause, FileText, Mail, MessageSquare } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Mock data for call history
const mockCalls = [
  {
    id: "call_01HXYZ123",
    agent: "Customer Support Agent",
    phone: "+1 (555) 123-4567",
    duration: "3m 42s",
    status: "completed",
    date: "2025-04-16T14:30:00",
    transcript:
      "Agent: Hello, thank you for calling our support line. How can I help you today?\n\nCaller: Hi, I'm having trouble with my account login.\n\nAgent: I understand. Let me help you with that. Can you please verify your email address?\n\nCaller: Sure, it's johndoe@example.com.\n\nAgent: Thank you. I can see your account. It looks like there were too many failed login attempts, which triggered a security lock. I've reset that for you now.\n\nCaller: Great, thank you!\n\nAgent: You're welcome. Is there anything else I can help you with today?\n\nCaller: No, that's all. Thanks for your help.\n\nAgent: You're welcome. Have a great day!",
  },
  {
    id: "call_01HXYZ456",
    agent: "Sales Representative",
    phone: "+1 (555) 987-6543",
    duration: "5m 18s",
    status: "completed",
    date: "2025-04-16T12:15:00",
    transcript:
      "Agent: Hello, this is the sales team. How may I assist you today?\n\nCaller: Hi, I'm interested in your premium plan but have some questions.\n\nAgent: I'd be happy to help. What would you like to know about our premium plan?\n\nCaller: What features are included that aren't in the basic plan?\n\nAgent: Great question. The premium plan includes unlimited AI calls, priority support, custom voice options, and detailed analytics. You also get access to our API with higher rate limits.\n\nCaller: That sounds good. What about pricing?\n\nAgent: The premium plan is $49.99 per month, or $499 if billed annually, which gives you two months free.\n\nCaller: I think I'll go with the annual plan. How do I sign up?\n\nAgent: Excellent choice! I can help you with that right now...",
  },
  {
    id: "call_01HXYZ789",
    agent: "Technical Support",
    phone: "+1 (555) 456-7890",
    duration: "8m 05s",
    status: "completed",
    date: "2025-04-15T16:45:00",
    transcript:
      "Agent: Technical support, how can I help you today?\n\nCaller: Hi, I'm having an issue with the API integration.\n\nAgent: I understand. Can you describe the problem you're experiencing?\n\nCaller: I'm getting a 429 error when making calls to the endpoint.\n\nAgent: That's a rate limit error. Let me check your account... I see you're on the basic plan which has a limit of 100 calls per minute. Your logs show you're trying to make about 150 calls per minute.\n\nCaller: Oh, I didn't realize there was a limit. What are my options?\n\nAgent: You could either optimize your code to make fewer calls, or upgrade to our premium plan which allows 500 calls per minute.\n\nCaller: I think I'll need to upgrade. How do I do that?\n\nAgent: I can help you with that right now...",
  },
  {
    id: "call_01HXYZ012",
    agent: "Appointment Scheduler",
    phone: "+1 (555) 234-5678",
    duration: "2m 12s",
    status: "failed",
    date: "2025-04-15T10:30:00",
    transcript:
      "Agent: Hello, I'm calling to confirm your appointment.\n\nCaller: Hello?\n\nAgent: Hi there, I'm calling from Example Clinic to confirm your appointment for tomorrow at 2 PM.\n\nCaller: I think you have the wrong number.\n\nAgent: I'm calling for John Smith regarding an appointment at Example Clinic.\n\nCaller: There's no John Smith here. You have the wrong number.\n\nAgent: I apologize for the confusion. I'll update our records. Thank you for your time.\n\n[Call ended]",
  },
  {
    id: "call_01HXYZ345",
    agent: "Customer Support Agent",
    phone: "+1 (555) 876-5432",
    duration: "4m 55s",
    status: "completed",
    date: "2025-04-14T15:20:00",
    transcript:
      "Agent: Thank you for calling customer support. How may I assist you today?\n\nCaller: Hi, I need to change my subscription plan.\n\nAgent: I'd be happy to help with that. Can you please verify your account by providing your email address?\n\nCaller: It's sarahj@example.com\n\nAgent: Thank you, Sarah. I can see your account. You're currently on our basic plan. Would you like to upgrade or downgrade?\n\nCaller: I'd like to upgrade to the business plan.\n\nAgent: Excellent choice. The business plan is $99 per month and includes all premium features plus dedicated support and team management tools. Would you like to proceed with this change?\n\nCaller: Yes, please.\n\nAgent: Great! I've updated your subscription. The changes will take effect immediately, and you'll be billed the new amount on your next billing cycle. Is there anything else I can help you with today?",
  },
]

export function CallHistoryTable() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [openTranscript, setOpenTranscript] = useState<string | null>(null)
  const [openExport, setOpenExport] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 17),
  })
  const [filteredCalls, setFilteredCalls] = useState(mockCalls)

  // Find the current transcript
  const currentTranscript = openTranscript ? mockCalls.find((call) => call.id === openTranscript)?.transcript : null

  // Filter calls based on search, agent, status, and date range
  useEffect(() => {
    let filtered = [...mockCalls]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (call) =>
          call.id.toLowerCase().includes(query) ||
          call.agent.toLowerCase().includes(query) ||
          call.phone.toLowerCase().includes(query),
      )
    }

    // Filter by agent
    if (selectedAgent !== "all") {
      filtered = filtered.filter((call) => call.agent.includes(selectedAgent))
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((call) => call.status === selectedStatus)
    }

    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
      filtered = filtered.filter((call) => {
        const callDate = new Date(call.date)
        return callDate >= dateRange.from && callDate <= dateRange.to
      })
    }

    setFilteredCalls(filtered)
  }, [searchQuery, selectedAgent, selectedStatus, dateRange])

  const togglePlayback = (callId: string) => {
    if (isPlaying === callId) {
      setIsPlaying(null)
    } else {
      setIsPlaying(callId)
    }
  }

  const viewTranscript = (callId: string) => {
    setOpenTranscript(callId)
  }

  const handleExportEmail = () => {
    toast({
      title: "Export Initiated",
      description: "Call data will be sent to your email shortly.",
    })
  }

  const handleExportSMS = () => {
    toast({
      title: "Export Initiated",
      description: "Call data will be sent via SMS shortly.",
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Now we have mock data
  const hasCalls = filteredCalls.length > 0

  return (
    <>
      <Card className="p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h3 className="text-lg font-medium">Export Call Data</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportEmail}>
              <Mail className="h-4 w-4" />
              Send to Email
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportSMS}>
              <MessageSquare className="h-4 w-4" />
              Send to SMS
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Label htmlFor="date-range" className="text-sm font-medium mb-2 block">
                Date Range
              </Label>
              <DatePickerWithRange className="w-full" value={dateRange} onChange={setDateRange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-1/2">
              <div className="space-y-2">
                <Label htmlFor="agent-filter" className="text-sm font-medium">
                  Agent
                </Label>
                <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                  <SelectTrigger id="agent-filter">
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                    <SelectItem value="Sales">Sales Representative</SelectItem>
                    <SelectItem value="Technical">Technical Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status-filter" className="text-sm font-medium">
                  Status
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        {hasCalls ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Call ID</th>
                  <th className="text-left py-3 px-4 font-medium">Agent</th>
                  <th className="text-left py-3 px-4 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 font-medium">Duration</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-center py-3 px-4 font-medium">Recording</th>
                  <th className="text-center py-3 px-4 font-medium">Transcript</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="border-b">
                    <td className="py-3 px-4 font-mono text-sm">{call.id}</td>
                    <td className="py-3 px-4">{call.agent}</td>
                    <td className="py-3 px-4">{call.phone}</td>
                    <td className="py-3 px-4">{call.duration}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={
                          call.status === "completed"
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                        }
                      >
                        {call.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(call.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePlayback(call.id)}
                        className={isPlaying === call.id ? "text-primary" : ""}
                      >
                        {isPlaying === call.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="ghost" size="icon" onClick={() => viewTranscript(call.id)}>
                        <FileText className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewTranscript(call.id)}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Transcript
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Recording
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Email Call Data
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-secondary p-3 rounded-md mb-4">
              <svg
                className="h-6 w-6 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.1" />
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-lg">No call history available</p>
          </div>
        )}
      </Card>

      {/* Transcript Dialog */}
      <Dialog open={openTranscript !== null} onOpenChange={(open) => !open && setOpenTranscript(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Call Transcript</DialogTitle>
            <DialogDescription>{openTranscript && `Call ID: ${openTranscript}`}</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="bg-secondary p-4 rounded-md font-mono text-sm whitespace-pre-line">{currentTranscript}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
