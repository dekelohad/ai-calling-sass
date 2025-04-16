"use client"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { DatePickerWithPresets } from "@/components/date-picker-with-presets"

export function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Analytics</h1>
      <div className="flex items-center gap-2">
        <DatePickerWithPresets />
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  )
}
