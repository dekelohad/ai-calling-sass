import { KnowledgeBaseHeader } from "@/components/knowledge-base-header"
import { KnowledgeBaseList } from "@/components/knowledge-base-list"

export default function KnowledgeBasePage() {
  return (
    <div className="p-6 space-y-6">
      <KnowledgeBaseHeader />
      <KnowledgeBaseList />
    </div>
  )
}
