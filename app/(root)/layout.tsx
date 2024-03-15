import React from 'react'
import Navbar from '@/components/shared/navbar' 

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='root'>
        <div className='root-container'>
            <div className='wrapper'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default Layout