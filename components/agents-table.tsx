"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusIcon, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for agents
const mockAgents = [
  {
    id: "agent_01",
    name: "Custom LLM agent",
    type: "Custom LLM",
    voice: "Cimo",
    phone: null,
    editedBy: "John Doe",
    editedAt: "04/17/2025, 00:34",
  },
  {
    id: "agent_02",
    name: "Sales Representative",
    type: "Single Prompt",
    voice: "Emma (en-US)",
    phone: "+1 (555) 987-6543",
    editedBy: "Jane Smith",
    editedAt: "04/16/2025, 15:22",
  },
  {
    id: "agent_03",
    name: "Technical Support",
    type: "Multi-Prompt",
    voice: "Dave (en-UK)",
    phone: "+1 (555) 456-7890",
    editedBy: "John Doe",
    editedAt: "04/15/2025, 09:45",
  },
]

export function AgentsTable() {
  // Now we have mock data
  const hasAgents = true

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">FOLDERS</h2>
        <Button variant="ghost" size="icon">
          <PlusIcon className="h-5 w-5" />
        </Button>
      </div>

      <Card className="p-6">
        <div className="w-full">
          {hasAgents ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Agent Name</th>
                    <th className="text-left py-3 px-4 font-medium">Agent Type</th>
                    <th className="text-left py-3 px-4 font-medium">Voice</th>
                    <th className="text-left py-3 px-4 font-medium">Phone</th>
                    <th className="text-left py-3 px-4 font-medium">Edited by</th>
                    <th className="text-right py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAgents.map((agent) => (
                    <tr key={agent.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{agent.name}</td>
                      <td className="py-3 px-4">{agent.type}</td>
                      <td className="py-3 px-4">{agent.voice}</td>
                      <td className="py-3 px-4">{agent.phone || "-"}</td>
                      <td className="py-3 px-4">{agent.editedAt}</td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
                  <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-lg mb-6">You don&apos;t have any agents yet.</p>
              <div className="flex gap-4">
                <Button variant="outline">Import</Button>
                <Button variant="default">
                  Create an Agent
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
