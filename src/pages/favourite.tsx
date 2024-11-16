import FavProduct from '@/components/FavProduct'
import ResetFav from '@/components/ResetFav'
import { productProps, stateProps } from '@/data'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Favourite() {
    const {favouriteData} = useSelector((state:stateProps)=>state.next)
  return (
    <div className='max-w-screen-xl mx-auto px-6 gap-10 py-4'>
      {favouriteData.length >0 ?<div className='bg-white p-4 rounded-lg'> 
        <div className='flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1'>
            <p className='text-2xl font-semibold text-amazon_blue'>
                Favourite Items
            </p>
            <p className='text-lg font-semibold text-amazon_blue'>Action</p>
            </div>
            <div>
                {favouriteData.map((item:productProps)=>(
                    <div key={item._id} className='mt-2'>

                        <FavProduct  item={item}/>
                    </div>
                ))}
                <ResetFav/>
            </div>
      </div>:<div className='bg-white h-64 col-span-1 md:col-span-3 lg:col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg'>
          <h1 className='text-base md:text-lg font-medium'>Your Favourite is empty!</h1>
          <Link href="/">
            <button className='mt-4 w-40 md:w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black'>
              Go to Shopping
            </button>
          </Link>
        </div>}
    </div>
  )
}
