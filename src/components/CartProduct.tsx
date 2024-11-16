import Image from 'next/image';
import React from 'react'
import Price from './Price';
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { decreaseQuantity, deleteProduct, increaseQuantity } from '@/lib/nextSlice';

interface item {
    _id:number;
    title:string;
    description:string;
    oldPrice:number;
    price:number;
    brand:string;
    image:string;
    isNew:boolean;
    category:string;
    quantity:number
}
interface cartprops{
    item:item
}

export default function CartProduct({item}:cartprops) {
    const dispatch = useDispatch()
  return (
    <div className='bg-gray-100 rounded-lg  flex items-center gap-4'>
      <Image src={item.image} alt='productimg' className='object-cover' width={150} height={150}/>
      <div className='flex items-center px-2 gap-4 w-[10rem] md:w-full'>
        <div className='flex flex-col gap-1'>
            <p className='text-lg font-semibold text-amazon_blue'>{item.title}</p>
            <p className='text-sm text-gray-600'>{item.description}</p>
            <p className='text-sm text-gray-600 '>

            Unit Price{" "} <span>
                <Price amount={item.price}/>
                </span>
                </p>
                <div className='flex items-center gap-6'>
                    <div className='flex items-center mt-1 mb-3 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300'>
                        <span onClick={()=>{
                            dispatch(decreaseQuantity({
                                _id:item._id,brand:item.brand,category:item.category,description:item.description,image:item.image,isNew:item.isNew,oldPrice:item.oldPrice,price:item.price,title:item.title,quantity:1

                            }))
                        }} className='w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer duration-300'>
                            <LuMinus/>
                        </span>
                        <span>{item.quantity}</span>
                        <span onClick={()=>{
                            dispatch(increaseQuantity({
                                _id:item._id,brand:item.brand,category:item.category,description:item.description,image:item.image,isNew:item.isNew,oldPrice:item.oldPrice,price:item.price,title:item.title,quantity:1

                            }))
                        }} className='w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer duration-300'>
                            <LuPlus/>
                        </span>
                    </div>
                    <div onClick={()=>{
                            dispatch(deleteProduct({
                                _id:item._id,brand:item.brand,category:item.category,description:item.description,image:item.image,isNew:item.isNew,oldPrice:item.oldPrice,price:item.price,title:item.title,quantity:1

                            }))
                        }} className='flex gap-1 items-baseline text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300'>
                    <FaRegTrashAlt  className='mt-[2px]'/>   <p>Remove</p>
                    </div>
                </div>
        </div>
        <div className='text-lg font-semibold text-amazon_blue lg:translate-x-0 lg:translate-y-0 translate-x-[-50px] translate-y-20'>
                <Price amount={item.price * item.quantity}/>
        </div>
      </div>
    </div>
  )
}
