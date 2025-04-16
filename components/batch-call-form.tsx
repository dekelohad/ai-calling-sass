"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Download, Upload } from "lucide-react"
import Link from "next/link"

interface Recipient {
  name: string
  phone: string
}

export function BatchCallForm() {
  const [batchName, setBatchName] = useState("")
  const [fromNumber, setFromNumber] = useState("")
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [sendTime, setSendTime] = useState("now")
  const [dragActive, setDragActive] = useState(false)
  const [csvFile, setCsvFile] = useState<File | null>(null)

  // Mock phone numbers
  const phoneNumbers = [
    { id: "1", number: "+1 (555) 123-4567" },
    { id: "2", number: "+1 (555) 987-6543" },
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setCsvFile(file)
        // In a real app, you would parse the CSV here
        // For now, we'll just mock some recipients
        setRecipients([
          { name: "John Doe", phone: "+1 (555) 111-2222" },
          { name: "Jane Smith", phone: "+1 (555) 333-4444" },
          { name: "Bob Johnson", phone: "+1 (555) 555-6666" },
        ])
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setCsvFile(file)
        // In a real app, you would parse the CSV here
        // For now, we'll just mock some recipients
        setRecipients([
          { name: "John Doe", phone: "+1 (555) 111-2222" },
          { name: "Jane Smith", phone: "+1 (555) 333-4444" },
          { name: "Bob Johnson", phone: "+1 (555) 555-6666" },
        ])
      }
    }
  }

  const downloadTemplate = () => {
    // In a real app, this would generate and download a CSV template
    console.log("Downloading template")
  }

  const getEstimatedTime = () => {
    if (recipients.length === 0) {
      return "Please add recipients first"
    }

    // Assume each call takes about 3 minutes
    const totalMinutes = recipients.length * 3
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours > 0) {
      return `Approximately ${hours} hour${hours > 1 ? "s" : ""} ${minutes > 0 ? `and ${minutes} minute${minutes > 1 ? "s" : ""}` : ""}`
    }

    return `Approximately ${minutes} minute${minutes > 1 ? "s" : ""}`
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link href="/call-history" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create a batch call</h1>
        <p className="text-sm text-muted-foreground flex items-center mt-1">Batch call cost $0.005 per dial</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="batch-name">Batch Call Name</Label>
            <Input
              id="batch-name"
              placeholder="Enter batch call name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="from-number">From number</Label>
            <Select value={fromNumber} onValueChange={setFromNumber}>
              <SelectTrigger id="from-number">
                <SelectValue placeholder="Select a phone number" />
              </SelectTrigger>
              <SelectContent>
                {phoneNumbers.map((phone) => (
                  <SelectItem key={phone.id} value={phone.id}>
                    {phone.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Recipients</Label>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-center"
              onClick={downloadTemplate}
            >
              <Download className="h-4 w-4" />
              Download the template
            </Button>

            <div
              className={`border-2 border-dashed rounded-md p-6 ${
                dragActive ? "border-primary bg-primary/5" : "border-input"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">Choose a csv or drag & drop it here.</p>
                <p className="text-xs text-muted-foreground">Up to 50 MB</p>
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                  <Button variant="outline" size="sm" type="button">
                    Choose file
                  </Button>
                </label>
              </div>
            </div>

            {csvFile && (
              <div className="text-sm">
                Selected file: <span className="font-medium">{csvFile.name}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>When to send the calls</Label>
            <RadioGroup value={sendTime} onValueChange={setSendTime} className="flex gap-4">
              <div className="flex items-center space-x-2 border rounded-md p-3 w-full">
                <RadioGroupItem value="now" id="send-now" />
                <Label htmlFor="send-now" className="cursor-pointer">
                  Send Now
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 w-full">
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="cursor-pointer">
                  Schedule
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Estimated Time to complete calls</Label>
            <div className="bg-slate-100 p-3 rounded-md text-sm">{getEstimatedTime()}</div>
          </div>

          <div className="pt-4">
            <Button
              className="w-full bg-black text-white hover:bg-black/90"
              disabled={!batchName || !fromNumber || recipients.length === 0}
            >
              {sendTime === "now" ? "Start Batch Call" : "Schedule Batch Call"}
            </Button>
          </div>
        </div>

        <div>
          <Card className="p-6 bg-slate-50">
            <h3 className="font-medium mb-4">Recipients</h3>

            {recipients.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm font-medium text-muted-foreground">
                  <div>Name</div>
                  <div>Phone</div>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {recipients.map((recipient, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 text-sm bg-white p-2 rounded-md">
                      <div>{recipient.name}</div>
                      <div>{recipient.phone}</div>
                    </div>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  Total: {recipients.length} recipient{recipients.length !== 1 ? "s" : ""}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-muted-foreground mb-2">Please upload recipients first</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
