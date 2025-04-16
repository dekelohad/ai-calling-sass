"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Clock, CreditCard, HelpCircle, Key, Users, Database, Phone, PhoneCall } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserDropdown } from "@/components/user-dropdown"
import { useAuth } from "@/lib/auth"
import { Logo } from "@/components/logo"

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const routes = [
    {
      name: "Call History",
      path: "/call-history",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Billing",
      path: "/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "API Keys",
      path: "/api-keys",
      icon: <Key className="h-5 w-5" />,
    },
    {
      name: "Agents",
      path: "/agents",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Knowledge Base",
      path: "/knowledge-base",
      icon: <Database className="h-5 w-5" />,
    },
    {
      name: "Phone Numbers",
      path: "/phone-numbers",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      name: "Batch Call",
      path: "/batch-call",
      icon: <PhoneCall className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-64 border-r border-border bg-background flex flex-col h-full">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Logo />
          <h1 className="text-xl font-bold">Retell AI</h1>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 p-2 rounded-md bg-secondary">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">ohad deke... Workspace</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn("sidebar-item", pathname === route.path && "active")}
            >
              {route.icon}
              {route.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="bg-secondary rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Free Trial</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm">Remaining:</span>
              <span className="text-sm font-medium">$10.00</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-1/3"></div>
            </div>
          </div>
          <Button variant="default" className="w-full">
            Add Payment
          </Button>
        </div>

        <div className="flex items-center justify-between p-2 rounded-md">
          {user && <UserDropdown name={user.name} email={user.email} />}
          <Link href="/help" className="sidebar-item">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Help Center</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
