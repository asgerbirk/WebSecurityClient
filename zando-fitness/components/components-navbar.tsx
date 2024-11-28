'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Dumbbell, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Classes', href: '/classes' },
  { name: 'Membership', href: '/membership' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8" />
            <span className="text-2xl font-bold">Zando Fitness</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-secondary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Login/Sign Up Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}