import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AIToolsContent } from "@/components/ai-tools/ai-tools-content"

export const metadata: Metadata = {
  title: "AI Tools - ContentGenius",
  description: "Use AI to generate and enhance your content",
}

export default function AIToolsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Tools" text="Use AI to generate and enhance your content" />
      <AIToolsContent />
    </DashboardShell>
  )
}

