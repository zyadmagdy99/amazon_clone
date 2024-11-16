import { productProps } from '@/data'
import Image from 'next/image'
import React from 'react'
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import Price from './Price';
import { useDispatch } from 'react-redux';
import { addToCart, addToFavorite } from '@/lib/nextSlice';
import Link from 'next/link';
 
interface props {
    data:productProps[]
}
export default function Products({data}:props) {
    const dispatch = useDispatch()
  return (
    <div className='w-full px-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 mt-3 md:mt-0'>
      {
        data.map(({_id,title,brand,category,description,image,isNew,price,oldPrice}:productProps)=>(
            <div key={_id} className='w-full bg-white text-black p-4 border border-gray-300 rounded-lg group overflow-hidden'>
               <div className='w-full h-[260px] relative'>
               <Link href={{pathname:`/${_id}`,query:{_id:_id,brand:brand,category:category,description:description,image:image,isNew:isNew,oldPrice:oldPrice,price:price,title:title}}}>
                <Image className='w-full h-full object-cover scale-95 hover:scale-100 transition-transform duration-300' width={300} height={300} src={image} alt='productImage'/>
                    </Link>
                <div className='w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:translate-x-0 transition-transform duration-300'>
                    <span onClick={()=>{
                        dispatch(addToCart({
                            _id:_id,brand:brand,category:category,description:description,image:image,isNew:isNew,oldPrice:oldPrice,price:price,title:title,quantity:1
                        }))
                    }} className='w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
                        <HiShoppingCart />
                    </span>
                    <span onClick={()=>{
                        dispatch(addToFavorite({
                            _id:_id,brand:brand,category:category,description:description,image:image,isNew:isNew,oldPrice:oldPrice,price:price,title:title,quantity:1
                        }))
                    }} className='w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300'>
                        <FaHeart/>
                    </span>
                </div>
                {
                    isNew && <p className='absolute top-0 right-0 text-amazon_blue font-medium text-xs tracking-wide animate-bounce'>!save <Price amount={oldPrice - price} />  </p>
                }
               </div>
               <hr />
               <div className='px-4 py-3 flex flex-col gap-1'>
                    <p className='text-xs text-gray-500 tracking-wide'>{category}</p>
                    <p className='text-base font-medium'>{title}</p>
                    <p className='flex items-center gap-2'>
                        <span className='text-sm line-through'>
                            <Price amount={oldPrice}/>
                        </span>
                        <span className='text-amazon_blue font-semibold'>
                            <Price amount={price}/>
                        </span>
                    </p>
                    <p className='text-xs text-gray-600 text-justify'>
                        {description.substring(0,120)}
                    </p>
                    <button onClick={()=>{
                        dispatch(addToCart({
                            _id:_id,brand:brand,category:category,description:description,image:image,isNew:isNew,oldPrice:oldPrice,price:price,title:title,quantity:1
                        }))
                    }} className='h-10 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2'>
                        add to cart
                    </button>
               </div>
            </div>
        ))
      }
    </div>
  )
}
