"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Brain, BarChart3, Cloud, Settings } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Content",
      href: "/dashboard/content",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "AI Tools",
      href: "/dashboard/ai-tools",
      icon: <Brain className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Cloud Services",
      href: "/dashboard/cloud",
      icon: <Cloud className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn("justify-start", pathname === item.href && "bg-muted font-medium")}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

