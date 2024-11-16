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
    <Footer className="fixed bottom-0 w-full bg-gray-800 text-white text-center py-4 shadow-lg" />
  </div>
  
  )
}
