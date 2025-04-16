import type React from "react"
export const Chart = () => {
  return null
}

export const ChartContainer = () => {
  return null
}

export const ChartTooltip = () => {
  return null
}

export const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none">{children}</div>
  )
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>
}

export const ChartLegendItem = ({ color, label }: { color: string; label: string }) => {
  return (
    <div className="flex items-center gap-1">
      <div className={`h-2 w-2 rounded-full`} style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  )
}
