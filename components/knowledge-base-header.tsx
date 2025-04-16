"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"
import { useState } from "react"
import { AddKnowledgeBaseDialog } from "@/components/add-knowledge-base-dialog"

export function KnowledgeBaseHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Knowledge Base</h1>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search knowledge base..." className="pl-8" />
          </div>
          <Button
            variant="default"
            className="bg-black text-white hover:bg-black/90 flex items-center gap-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Add Knowledge Base
          </Button>
        </div>
      </div>

      <AddKnowledgeBaseDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
