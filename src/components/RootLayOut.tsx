import React, { ReactElement } from 'react'
import Header from './header/header'
import BottomHeader from './header/BottomHeader'
import Footer from './Footer'

interface props {
    children: ReactElement
}

export default function RootLayOut({children} : props) {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <BottomHeader />
    <main className="flex-1">{children}</main>
    <div>
      
    </div>
    <Footer  />
  </div>
  
  )
}
