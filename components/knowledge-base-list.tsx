"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, Database, Trash2, Edit, ExternalLink, PlusCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Mock data for knowledge bases
const mockKnowledgeBases = [
  {
    id: "kb_01",
    name: "Product Information",
    documentCount: 12,
    lastUpdated: "2025-04-10T14:30:00",
    status: "active",
  },
  {
    id: "kb_02",
    name: "Pricing and Plans",
    documentCount: 5,
    lastUpdated: "2025-04-12T09:15:00",
    status: "active",
  },
  {
    id: "kb_03",
    name: "Technical Documentation",
    documentCount: 24,
    lastUpdated: "2025-04-15T16:45:00",
    status: "active",
  },
  {
    id: "kb_04",
    name: "FAQ Database",
    documentCount: 36,
    lastUpdated: "2025-04-16T11:30:00",
    status: "active",
  },
]

export function KnowledgeBaseList() {
  const [knowledgeBases, setKnowledgeBases] = useState(mockKnowledgeBases)

  const hasKnowledgeBases = knowledgeBases.length > 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {hasKnowledgeBases ? (
        knowledgeBases.map((kb) => (
          <Card key={kb.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-lg">{kb.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {kb.documentCount} document{kb.documentCount !== 1 ? "s" : ""}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      View Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Updated{" "}
                  {new Date(kb.lastUpdated).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {kb.status}
                </Badge>
              </div>
            </div>

            <div className="border-t p-4 bg-slate-50">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Add Documents
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <Card className="col-span-full p-6">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-slate-100 p-3 rounded-md mb-4">
              <Database className="h-6 w-6 text-slate-500" />
            </div>
            <p className="text-lg mb-6">No knowledge bases available</p>
            <Button variant="default" className="bg-black text-white hover:bg-black/90 flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Knowledge Base
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
