import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}

