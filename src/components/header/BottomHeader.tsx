import { stateProps } from '@/data';
import { removeUser } from '@/lib/nextSlice';
import { signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar';

export default function BottomHeader() {
  const {userInfo} = useSelector((state:stateProps)=>state.next)
  const dispatch = useDispatch()
  function handleSignOut(){
    signOut()
    dispatch(removeUser())
  }
  const [showside, setshowside] = useState(false)
  function handleside() {

    setshowside(prev=>!prev)
  }
  const handleScroll = () => {
    if (window.scrollY > 50) {  
      setshowside(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className='w-full h-10 relative bg-amazon_light text-sm text-white px-4 flex items-center'>
      <div className={`${showside?"block":"hidden"} md:hidden duration-300 absolute top-0 bottom-0 left-0 w-[85%] z-50`}>
        <Sidebar showside={showside} handleside={handleside}/>
      </div>
      <p onClick={handleside} className='flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        <LuMenu className='text-xl' />
      </p>
      <p className='hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Today Deals
      </p>
      <p className='hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Customer Service
      </p>
      <p className='hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Registry
      </p>
      <p className='hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Gift Cards
      </p>
      <p className='hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300'>
        Sell
      </p>
      {userInfo && <p onClick={handleSignOut} className='hidden md:inline-flex items-center gap-1 h-8 px-2 border border-transparent hover:border-red-600 text-amazon_yellow hover:text-red-400 cursor-pointer duration-300'>
        Sign Out
      </p>}
    </div>
  )
}
