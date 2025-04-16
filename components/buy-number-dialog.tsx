"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search } from "lucide-react"

interface BuyNumberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BuyNumberDialog({ open, onOpenChange }: BuyNumberDialogProps) {
  const [country, setCountry] = useState("US")
  const [numberType, setNumberType] = useState("local")
  const [areaCode, setAreaCode] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null)

  // Mock function to simulate searching for available numbers
  const searchNumbers = () => {
    // In a real app, this would call an API to search for available numbers
    const mockResults = [
      "+1 (555) 123-4567",
      "+1 (555) 234-5678",
      "+1 (555) 345-6789",
      "+1 (555) 456-7890",
      "+1 (555) 567-8901",
    ]
    setSearchResults(mockResults)
  }

  const handleSubmit = () => {
    // Here you would handle the actual purchase
    console.log("Purchasing number:", selectedNumber)
    onOpenChange(false)
    setSelectedNumber(null)
    setSearchResults([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Buy New Phone Number</DialogTitle>
          <DialogDescription>Search and purchase a new phone number for your AI agents.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue={country} onValueChange={setCountry}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Number Type</Label>
              <Select defaultValue={numberType} onValueChange={setNumberType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="toll-free">Toll-Free</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area-code">Area Code (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="area-code"
                placeholder="e.g. 415"
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
              />
              <Button type="button" onClick={searchNumbers}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Label>Available Numbers</Label>
              <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
                <RadioGroup value={selectedNumber || ""} onValueChange={setSelectedNumber}>
                  {searchResults.map((number) => (
                    <div key={number} className="flex items-center space-x-2 p-2 hover:bg-slate-50 rounded-md">
                      <RadioGroupItem value={number} id={number} />
                      <Label htmlFor={number} className="flex-1 cursor-pointer">
                        {number}
                      </Label>
                      <span className="text-sm text-muted-foreground">$3.00/month</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedNumber}>
            Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
