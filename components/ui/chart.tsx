import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChartTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
}

export function ChartTooltip({ content, children }: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function ChartTooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none">
      {children}
    </div>
  )
}

export function ChartLegend({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>
}

export function ChartLegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  )
}
