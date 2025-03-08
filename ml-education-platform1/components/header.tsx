"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Menu, Search, User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <SidebarTrigger className="md:hidden" />
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">ML</span>
            </div>
            <span className="hidden font-bold sm:inline-block">ML Explorer</span>
          </Link>
        </div>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex items-center ml-6 space-x-1">
          <NavItem href="/" isActive={pathname === "/"}>
            Home
          </NavItem>
          <NavItem href="/dashboard" isActive={pathname === "/dashboard"}>
            Dashboard
          </NavItem>
          <NavItem href="/lessons" isActive={pathname === "/lessons"}>
            Lessons
          </NavItem>
          <NavItem href="/playground" isActive={pathname === "/playground"}>
            Playground
          </NavItem>
          <NavItem href="/settings" isActive={pathname === "/settings"}>
            Settings
          </NavItem>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {isSearchOpen ? (
            <div className="flex items-center w-full max-w-sm mr-2">
              <Input
                placeholder="Search lessons, modules..."
                className="h-9"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="mr-2">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/dashboard" className="text-lg font-medium transition-colors hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/lessons" className="text-lg font-medium transition-colors hover:text-primary">
                  Lessons
                </Link>
                <Link href="/playground" className="text-lg font-medium transition-colors hover:text-primary">
                  Playground
                </Link>
                <Link href="/settings" className="text-lg font-medium transition-colors hover:text-primary">
                  Settings
                </Link>
                <Link href="/about" className="text-lg font-medium transition-colors hover:text-primary">
                  About
                </Link>
                <Link href="/contact" className="text-lg font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function NavItem({
  href,
  isActive,
  children,
}: {
  href: string
  isActive: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive ? "bg-primary/10 text-primary" : "text-foreground/70 hover:text-foreground hover:bg-accent"
      }`}
    >
      {children}
    </Link>
  )
}

