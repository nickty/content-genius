"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth/auth-context"
import { Brain } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <Brain className="h-6 w-6" />
        <span>ContentGenius</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link
          href="/#features"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/#features" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Features
        </Link>
        <Link
          href="/#technologies"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/#technologies" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Technologies
        </Link>
        <Link
          href="/#roadmap"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/#roadmap" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Roadmap
        </Link>
        {user && (
          <Link
            href="/dashboard"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname.startsWith("/dashboard") ? "text-primary" : "text-muted-foreground",
            )}
          >
            Dashboard
          </Link>
        )}
      </nav>
    </div>
  )
}

