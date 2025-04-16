import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import { CreateAgentDropdown } from "@/components/create-agent-dropdown"

export function AgentsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-xl font-semibold">All Agents</h1>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search..." className="w-64" />
        <Button variant="outline">Import</Button>
        <CreateAgentDropdown />
      </div>
    </div>
  )
}
