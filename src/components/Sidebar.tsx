import { stateProps } from '@/data';
import { removeUser } from '@/lib/nextSlice';
import { signOut } from 'next-auth/react';
import React from 'react'
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';

interface Sidebarprops {
    showside:boolean,
    handleside:()=>void
}
export default function Sidebar({showside,handleside}:Sidebarprops) {
    const {userInfo} = useSelector((state:stateProps)=>state.next)
  const dispatch = useDispatch()
  function handleSignOut(){
    signOut()
    dispatch(removeUser())
  }

  
  return (
    <div className= {`bg-gray-800  flex justify-between ${showside?"flex":"hidden"} items-baseline  z-50 `}>
        <div className='flex flex-col items-start  gap-5 pt-5'>
            
      <p className=' flex items-center  gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Today Deals
      </p>
      <p className=' flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Customer Service
      </p>
      <p className=' flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Registry
      </p>
      <p className=' flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Gift Cards
      </p>
      <p className=' flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Sell
      </p>
      {userInfo && <p onClick={handleSignOut} className=' flex items-center gap-1 h-8 px-2 border border-transparent hover:border-red-600 text-amazon_yellow hover:text-red-400 cursor-pointer duration-300'>
        Sign Out
      </p>}
        </div>
        <div>
        <p onClick={handleside}  className='flex pe-10 items-center gap-1 h-8 px-2  cursor-pointer duration-300'>
        <LuMenu className='text-xl' />
      </p>
        </div>
    </div>
  )
}
