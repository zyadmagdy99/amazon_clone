import { productProps } from '@/data'
import { addToCart, addToFavorite } from '@/lib/nextSlice'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Price from '@/components/Price'
import { PulseLoader } from 'react-spinners'

export default function OneProduct() {
  const [isLoading, setisLoading] = useState(true)
    const router = useRouter()
    const dispatch = useDispatch()
    const [product, setproduct] = useState<productProps | null>(null)

    useEffect(() => {
      if (router.query && router.query._id) {
        // Use type assertion here to tell TypeScript that the query parameters are of type `productProps`
        const productData = router.query as unknown as productProps; // Force the type
        setproduct(productData);
        
        setTimeout(() => {
          setisLoading(false);
        }, 1500);
      }
    }, [router.query]);
  
    if (!product) {
      return <div>Loading...</div>;
    }
    
  return (
    <div className='max-w-screen-xl mx-auto px-4 py-4 md:py-10'>
      
      {isLoading ?<div className='w-full flex flex-col gap-6 items-center justify-center py-20'>
        <p>Your product is Loading ...</p>
        <PulseLoader size={40} color='#131921'/>
      </div> :<div className='w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg'>
        <div className='flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden'>
          <Image src={product.image} width={500} height={500} alt='product iamge' />
          <div className='w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300'>
                    <span onClick={()=>{
                        dispatch(addToCart({
                            _id:product._id,brand:product.brand,category:product.category,description:product.description,image:product.image,isNew:product.isNew,oldPrice:product.oldPrice,price:product.price,title:product.title,quantity:1
                        }))
                    }} className='w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
                        <HiShoppingCart />
                    </span>
                    <span onClick={()=>{
                        dispatch(addToFavorite({
                          _id:product._id,brand:product.brand,category:product.category,description:product.description,image:product.image,isNew:product.isNew,oldPrice:product.oldPrice,price:product.price,title:product.title,quantity:1
                        }))
                    }} className='w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
                        <FaHeart/>
                    </span>
                </div>
        </div>
        <div className='md:col-span-2 flex flex-col gap-3 justify-center p-4'>
          <p className='text-xs md:text-sm text-amazon_blue font-semibold -mb-3'>
            {product.category}_{product.brand}
          </p>
          <h1 className='text-xl md:text-3xl tracking-wide font-semibold'>
            {product.title}
          </h1>
                <p className='text-base text-gray-600 flex items-center gap-1'>
                  price:{" "}
                  <span className='text-lg text-amazon_blue font-semibold'>
                    <Price amount={product.price}/>
                  </span>
                  <span className='ml-1 line-through'>
                    <Price amount={product.oldPrice}/>
                  </span>
                </p>
                <p className='text-sm text-gray-500 flex items-center gap-1'>
                  Your saved:{" "}
                  <span><Price amount={product.oldPrice - product.price}/></span>
                </p>
                <button onClick={()=>{
                        dispatch(addToFavorite({
                          _id:product._id,brand:product.brand,category:product.category,description:product.description,image:product.image,isNew:product.isNew,oldPrice:product.oldPrice,price:product.price,title:product.title,quantity:1
                        }))
                    }} className='w-full mt-5 md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg text-base font-semibold'>
                    add to cart
                </button>
        </div>
      </div>}
      
    </div>
  )
}
