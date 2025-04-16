"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Plus } from "lucide-react"
import { useState } from "react"

// Mock data for phone numbers
const mockPhoneNumbers: PhoneNumber[] = []

interface PhoneNumber {
  id: string
  number: string
  country: string
  type: "local" | "toll-free" | "mobile"
  status: "active" | "pending" | "inactive"
  assignedTo: string | null
  monthlyPrice: number
  purchaseDate: string
}

export function PhoneNumbersList() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>(mockPhoneNumbers)

  const hasPhoneNumbers = phoneNumbers.length > 0

  return (
    <Card className="p-6">
      {hasPhoneNumbers ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Phone Number</th>
                <th className="text-left py-3 px-4 font-medium">Country</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Assigned To</th>
                <th className="text-left py-3 px-4 font-medium">Monthly Price</th>
                <th className="text-left py-3 px-4 font-medium">Purchase Date</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {phoneNumbers.map((phoneNumber) => (
                <tr key={phoneNumber.id} className="border-b">
                  <td className="py-3 px-4 font-medium">{phoneNumber.number}</td>
                  <td className="py-3 px-4">{phoneNumber.country}</td>
                  <td className="py-3 px-4 capitalize">{phoneNumber.type}</td>
                  <td className="py-3 px-4 capitalize">{phoneNumber.status}</td>
                  <td className="py-3 px-4">{phoneNumber.assignedTo || "—"}</td>
                  <td className="py-3 px-4">${phoneNumber.monthlyPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {new Date(phoneNumber.purchaseDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="outline" size="sm">
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-slate-100 p-3 rounded-md mb-4">
            <Phone className="h-6 w-6 text-slate-500" />
          </div>
          <p className="text-lg mb-2">You don't have any phone numbers</p>
          <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
            Purchase a new phone number or connect your existing number via SIP trunking to start making AI calls.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Connect via SIP
            </Button>
            <Button variant="default" className="bg-black text-white hover:bg-black/90 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Buy New Number
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

function Link(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}
