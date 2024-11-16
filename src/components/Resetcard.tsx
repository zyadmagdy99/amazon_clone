import { reset } from '@/lib/nextSlice'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function Resetcard() {
    const dispatch = useDispatch()
    const handleReset = ()=>{
        const confirm = window.confirm('Are you suro to reset your item from the cart?')
        if(confirm){
            dispatch(reset())
        }
    }
  return (
    <button onClick={handleReset} className='w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300'>
      reset cart
    </button>
  )
}
