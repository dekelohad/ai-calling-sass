import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Key, Copy, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for API keys
const mockApiKeys = [
  {
    id: "key_01",
    name: "Production API Key",
    key: "rt_sk_01HXYZ123456789ABCDEFGHIJK",
    created: "2025-03-15T10:30:00",
    lastUsed: "2025-04-16T14:30:00",
  },
  {
    id: "key_02",
    name: "Development API Key",
    key: "rt_sk_01HXYZ987654321ZYXWVUTSRQP",
    created: "2025-03-20T15:45:00",
    lastUsed: "2025-04-15T09:15:00",
  },
]

export function ApiKeysTable() {
  // Now we have mock data
  const hasKeys = true

  return (
    <Card className="p-6">
      {hasKeys ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Key</th>
                <th className="text-left py-3 px-4 font-medium">Created</th>
                <th className="text-left py-3 px-4 font-medium">Last Used</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockApiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="border-b">
                  <td className="py-3 px-4 font-medium">{apiKey.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="font-mono text-sm">
                        {apiKey.key.substring(0, 8)}...{apiKey.key.substring(apiKey.key.length - 4)}
                      </span>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(apiKey.created).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(apiKey.lastUsed).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Regenerate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Revoke</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-slate-100 p-3 rounded-md mb-4">
            <Key className="h-6 w-6 text-slate-500" />
          </div>
          <p className="text-lg">No API keys created yet</p>
        </div>
      )}
    </Card>
  )
}
