import { Link } from 'lucide-react'
import React from 'react'
import Image from 'next/link'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
        <div className="flex size-full flex-col gap-4">
            <Link href="/" className="sidebar-logo">
                <Image href="/assets/images/logo-text.svg"/>
            </Link>
        </div>
    </aside>
  )
}

export default Sidebar