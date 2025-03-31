import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import {SignOutButton, UserButton} from '@clerk/nextjs'
import {SignedIn} from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'
const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl">
         College Preconnect
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="/"className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/communities" className="text-sm text-muted-foreground hover:text-foreground">
            Communities
          </Link>
          <Link href="/students" className="text-sm text-muted-foreground hover:text-foreground">
            Students
          </Link>
          <Link href="/onboarding" className="text-sm text-muted-foreground hover:text-foreground">
            Profile
          </Link>
          <Link href="/friends" className="text-sm text-muted-foreground hover:text-foreground">
            Friends
          </Link>
          <Link href="/requests" className="text-sm text-muted-foreground hover:text-foreground">
            Requests
          </Link>
          <Link href="/notifications" className="text-sm text-muted-foreground hover:text-foreground">
            Notifications
          </Link>
          <Link href="/chats" className="text-sm text-muted-foreground hover:text-foreground">
            Chats
          </Link>
          <Link href="/contactus" className="text-sm text-muted-foreground hover:text-foreground">
            Contact Us
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
        <Button variant="outline" size="sm">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button size="sm">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
        </SignedOut>
        <SignedIn>
          <div className="cursor-pointer">
          <SignOutButton/>
          </div>
        <UserButton/>
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar