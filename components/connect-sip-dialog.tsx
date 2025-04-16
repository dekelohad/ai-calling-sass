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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoIcon } from "lucide-react"

interface ConnectSipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectSipDialog({ open, onOpenChange }: ConnectSipDialogProps) {
  const [sipUri, setSipUri] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    // Here you would handle the actual SIP connection
    console.log("Connecting SIP:", { sipUri, username, password })
    onOpenChange(false)
    setSipUri("")
    setUsername("")
    setPassword("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Connect via SIP Trunking</DialogTitle>
          <DialogDescription>Connect your existing phone system via SIP trunking.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="sip-uri">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sip-uri">SIP URI</TabsTrigger>
            <TabsTrigger value="credentials">SIP Credentials</TabsTrigger>
          </TabsList>
          <TabsContent value="sip-uri" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="sip-uri">SIP URI</Label>
              <Input
                id="sip-uri"
                placeholder="sip:username@sip.example.com"
                value={sipUri}
                onChange={(e) => setSipUri(e.target.value)}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-md flex gap-2 text-sm text-blue-700">
              <InfoIcon className="h-5 w-5 flex-shrink-0" />
              <p>
                Enter your SIP URI to connect your existing phone system. This will allow you to use your existing phone
                numbers with our AI calling system.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="credentials" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="SIP username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="SIP password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="bg-blue-50 p-3 rounded-md flex gap-2 text-sm text-blue-700">
              <InfoIcon className="h-5 w-5 flex-shrink-0" />
              <p>
                Enter your SIP credentials to connect your existing phone system. You can get these credentials from
                your VoIP provider.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={sipUri === "" && (username === "" || password === "")}>
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
