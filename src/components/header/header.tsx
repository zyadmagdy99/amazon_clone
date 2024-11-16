import React, { useEffect, useState } from 'react'
import logo from "../../images/logo.png"
import carticon from "../../images/cartIcon.png"
import Image from 'next/image'
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {  stateProps, storeProduct } from '@/data';
import { useSession, signIn } from "next-auth/react";
import { addUser } from '@/lib/nextSlice';
import SearchProducts from '../SearchProducts';


export default function Header() {
  const {productData,favouriteData ,userInfo , allProducts} = useSelector((state:stateProps)=>state.next)
  const [allData, setallData] = useState([])
  const [inSearch, setinSearch] = useState('')
  const [filterData, setfilterData] = useState([])
  
useEffect(() => {
  setallData(allProducts.allProduct)
  
}, [allProducts])

useEffect(() => {
  const filtered =allData.filter((item:storeProduct)=>item.title.toLocaleLowerCase().includes(inSearch.toLowerCase()))
 setfilterData(filtered);
 
}, [inSearch])

function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
  setinSearch(e.target.value)
  
}

  const dispatch = useDispatch()
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);

  
  return (
    <div className='w-full h-20 sticky bg-amazon_blue text-lightText top-0 z-50'>
      <div className='h-full w-full relative mx-auto justify-between gap-1 px-4 inline-flex items-center'>
        {/* logo */}
        <Link href={"/"} className='cursor-pointer border border-transparent hover:border-white px-2 duration-300 h-[70%] flex justify-center items-center'>
        <Image src={logo} alt="logo" className='object-cover w-28' />
        </Link>
        {/* delivery */}
        <div className='cursor-pointer border border-transparent hidden xl:inline-flex hover:border-white px-2 duration-300 h-[70%] gap-1 justify-center items-center'>
        <SlLocationPin />
        <div className='text-xs'>
            <p>Deliver to</p>
            <p className='text-white font-bold uppercase'>Egypt</p>
        </div>
        </div>
        {/* Searchbar */}
        <div className='flex-1  h-10 absolute md:top-0 md:left-0 min-w-[20rem] top-20 left-20 md:inline-flex items-center justify-between md:relative'>
            <input value={inSearch} onChange={handleSearch} type="text" className='w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow'  placeholder='Search Amazon products' />
            <span className='w-12 h-full bg-amazon_yellow right-0 bottom-0  cursor-pointer text-black text-2xl flex items-center justify-center absolute md:right-0 rounded-r-md'>
                <HiOutlineSearch/>
            </span>
            {/* search */}
            {inSearch && (
              <div className='absolute min-w-[30rem] -left-20 md:left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black'>
                {filterData.length > 0?(<>
                {inSearch && filterData.map((item:storeProduct)=>(
                  <Link onClick={()=>{setinSearch("")}} key={item._id} className='w-full border-b-[1px] border-b-gray-400 flex items-center gap-4' href={{pathname:`${item._id}`,query:{
                    _id:item._id,brand:item.brand,category:item.category,description:item.description,image:item.image,isNew:item.isNew,oldPrice:item.oldPrice,price:item.price,title:item.title
                  }}}>
                    <div><SearchProducts item={item}/></div>
                  </Link>
                ))}
                </>):
                (<div className='bg-gray-50 flex items-center justify-center py-10 ps-5 rounded-lg shadow-lg'><p className='text-xl font-semibold'>
                  Nothing match with your search keyword. Please try again!
                  </p> </div>)}
              </div>
            )}
            {/* search */}
        </div>
        {/* signin */}
         {userInfo?<div  className='flex  items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1'>
            <img className='w-8 h-8 rounded-full object-cover' src={userInfo.image} alt="userimage" />
            <div className='text-xs text-gray-100 flex flex-col justify-between'>
            <p className='text-white font-bold'>{userInfo.name}</p>
            <p className='hidden md:block'>{userInfo.email}</p>

            </div>
         </div>:<div onClick={()=>{signIn()}} className='text-xs text-gray-100 flex flex-col cursor-pointer border border-transparent hover:border-white px-2 duration-300 h-[70%] justify-center'>
            <p>Hello,sign in</p>
            <p className='text-white font-bold flex items-center'>
                Account & Lists
                <span>
                    <BiCaretDown />
                </span>
            </p>
         </div>}
         {/* favorite  */}
         <Link href="/favourite" className='text-xs relative text-gray-100 flex flex-col cursor-pointer border border-transparent hover:border-white px-2 duration-300 h-[70%] justify-center'>
            <p>Marked</p>
            <p className='text-white font-bold'>
                & Favorite
            </p>
            {
              favouriteData.length > 0 && (<span className='absolute right-2 top-2  w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow'>
                {favouriteData.length}
              </span>)
            }
         </Link>
         {/* cart */}
         <Link href={"/Cart"} className='items-center flex relative cursor-pointer border border-transparent hover:border-white px-2 duration-300 h-[70%]'>
         <Image src={carticon} alt="logo" className='object-cover w-auto h-8' />
         <p className='text-xs text-white me-4 sm:me-0 font-bold mt-3'>Cart </p>
         <span className='absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold'>
         {productData?productData.length:0}
         </span>

            </Link>

      </div>
    </div>
  )
}
