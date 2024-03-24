"use client";

import Link from 'next/link'
import MaxWidthWrapper from '../MaxWidthWrapper'
import { Button, buttonVariants } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/app/constants'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';
import MobileNav from './MobileNav';


const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <ul className='flex h-14 items-center justify-between border-b'>
          <li className='float-left flex'>
          <SignedIn>
          <UserButton afterSignOutUrl='/'/>
          
          </SignedIn>
          <SignedOut>
            <Button className="shadow bg-blue-600" variant="outline">
            <Link className="text-white" href="/sign-in">
              התחבר
            </Link>
            </Button>
          
          <Button className="shadow bg-white-600 align-center" variant="outline">
          <Link className="text-blue-600 border-blue-600" href="/sign-up">
            הירשם
          </Link>
          </Button>
          </SignedOut>
          </li>
          <li className='float-left flex display-none'>
          <SignedIn>
          <div className='space-x-0'>
            {navLinks.map((link) => {
              return (
                <Button className="bg-white-600 align-center border-none" variant="outline">
                <Link className="text-blue-600" href={link.route}>
                  {link.label}
                </Link>
                </Button>
              )
            })}
            </div>
            </SignedIn>

          </li>
          <li className='flex'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>תקצר-פוד.</span>
          </Link>
          </li>
        </ul>
      </MaxWidthWrapper>

    </nav>
  )
}

export default Navbar