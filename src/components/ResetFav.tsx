import { resetFav } from '@/lib/nextSlice'
import React from 'react'
import { useDispatch } from 'react-redux'
export default function ResetFav() {
    const dispatch = useDispatch()
    const handleReset = ()=>{
        const confirm = window.confirm('Are you suro to reset your items from the Favourites?')
        if(confirm){
            dispatch(resetFav())
        }
    }
  return (
    <button onClick={handleReset} className='w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300'>
    reset 
  </button>
  )
}
