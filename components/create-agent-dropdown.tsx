"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, GitBranch, MessageSquare, LinkIcon, Layers } from "lucide-react"
import Link from "next/link"

export function CreateAgentDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-black text-white hover:bg-black/90">
          Create an Agent
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <Link href="/agents/create?type=conversation-flow">
          <DropdownMenuItem className="py-3 cursor-pointer">
            <div className="flex gap-3">
              <GitBranch className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Conversation Flow Agent</span>
                <span className="text-xs text-muted-foreground">For tasks with complex transitions</span>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>

        <Link href="/agents/create?type=single-prompt">
          <DropdownMenuItem className="py-3 cursor-pointer">
            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Single Prompt Agent</span>
                <span className="text-xs text-muted-foreground">For short calls and straightforward tasks</span>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>

        <Link href="/agents/create?type=multi-prompt">
          <DropdownMenuItem className="py-3 cursor-pointer">
            <div className="flex gap-3">
              <Layers className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Multi-Prompt Agent</span>
                <span className="text-xs text-muted-foreground">For lengthy calls and complex tasks</span>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>

        <Link href="/agents/create?type=custom-llm">
          <DropdownMenuItem className="py-3 cursor-pointer">
            <div className="flex gap-3">
              <LinkIcon className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="font-medium">Custom LLM</span>
                <span className="text-xs text-muted-foreground">Attach your custom llm link</span>
              </div>
            </div>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
