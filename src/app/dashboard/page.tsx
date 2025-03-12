import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export const metadata: Metadata = {
  title: "Dashboard - ContentGenius",
  description: "Manage your content and view analytics",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your content and view analytics" />
      <DashboardOverview />
    </DashboardShell>
  )
}

