"use client"

import { Button } from "@/components/ui/button"
import { Plus, Link } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { BuyNumberDialog } from "@/components/buy-number-dialog"
import { ConnectSipDialog } from "@/components/connect-sip-dialog"

export function PhoneNumbersHeader() {
  const [buyNumberOpen, setBuyNumberOpen] = useState(false)
  const [connectSipOpen, setConnectSipOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Phone Numbers</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-black text-white hover:bg-black/90 rounded-full h-10 w-10 p-0">
              <Plus className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setBuyNumberOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Buy New Number
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setConnectSipOpen(true)}>
              <Link className="mr-2 h-4 w-4" />
              Connect to your number via SIP trunking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <BuyNumberDialog open={buyNumberOpen} onOpenChange={setBuyNumberOpen} />
      <ConnectSipDialog open={connectSipOpen} onOpenChange={setConnectSipOpen} />
    </>
  )
}
