import { Button } from "@/components/ui/button"

export function ApiKeysHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">API Keys</h1>
      <Button variant="default" className="bg-black text-white hover:bg-black/90">
        Create New Key
      </Button>
    </div>
  )
}
