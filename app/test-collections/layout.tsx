export default function TestCollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">{children}</main>
    </div>
  )
} 