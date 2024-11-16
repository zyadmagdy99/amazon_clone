import Cartpayment from '@/components/Cartpayment'
import CartProduct from '@/components/CartProduct'
import Resetcard from '@/components/Resetcard'
import { stateProps, storeProduct } from '@/data'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'


export default function Cart() {
  let {productData} = useSelector((state: stateProps) => state.next)
  
  return (
    <div className='max-w-screen-2xl  mx-auto px-4 sm:px-6 md:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10 py-4'>
      {productData.length > 0 ? ( 
        <>
          {/* Product List Section */}
          <div className='bg-white md:col-span-2 lg:col-span-4 p-4 rounded-lg'>
            <div className='flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1'>
              <p className='text-xl sm:text-2xl font-semibold text-amazon_blue'>Shopping Cart</p>
              <p className='text-lg sm:text-xl font-semibold text-amazon_blue'>Subtitle</p>
            </div>
            <div className='pt-2 flex flex-col gap-2'>
              {productData.map((item: storeProduct) => (
                <div key={item._id} className='pt-2 flex flex-col gap-2'>
                  <CartProduct item={item} />
                </div>
              ))}
              <Resetcard />
            </div>
          </div>
          
          {/* Payment Section */}
          <div className='bg-white h-48 md:h-64 lg:h-72 col-span-1 p-4 rounded-lg flex items-center justify-center'>
            <Cartpayment />
          </div>
        </>
      ) : (
        <div className='bg-white h-64 col-span-1 md:col-span-3 lg:col-span-5 flex flex-col items-center justify-center py-5 rounded-lg shadow-lg'>
          <h1 className='text-base md:text-lg font-medium'>Your Cart is empty!</h1>
          <Link href="/">
            <button className='mt-4 w-40 md:w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black'>
              Go to Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
