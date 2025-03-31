import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="font-bold text-xl mb-4 inline-block">
              College Preconnect
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              Connect, Collaborate, and Thrive in your Academic Community
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Community Guidelines</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Support Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Twitter</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Discord</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} College Preconnect. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer