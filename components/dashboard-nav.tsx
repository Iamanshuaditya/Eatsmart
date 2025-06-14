"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Utensils, Camera, BarChart2, User, Settings, Menu, X, Sparkles } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { EdgePanel } from "@/components/edge-panel"

export function DashboardNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <BarChart2 className="h-5 w-5" /> },
    { href: "/dashboard/scan", label: "Scan Food", icon: <Camera className="h-5 w-5" /> },
    { href: "/dashboard/health-report", label: "Health Report", icon: <Sparkles className="h-5 w-5" /> },
    { href: "/dashboard/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <header className="sticky top-0 z-50 one-ui-glass border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">EatSmart</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="sm" className="hidden md:flex rounded-full">
            Log out
          </Button>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden one-ui-glass border-b">
          <nav className="flex flex-col p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-full",
                  pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <Button variant="outline" className="w-full mt-2 rounded-full">
              Log out
            </Button>
          </nav>
        </div>
      )}

      {/* Edge Panel */}
      <EdgePanel />
    </header>
  )
}
