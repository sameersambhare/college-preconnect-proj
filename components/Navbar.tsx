import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl">
         College Preconnect
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Communities
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Roommate Finder
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Projects
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Testimonials
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          Sign In
        </Button>
        <Button size="sm">
          Sign Up
        </Button>
      </div>
    </nav>
  )
}

export default Navbar