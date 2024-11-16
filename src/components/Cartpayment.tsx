import React, { useEffect, useState } from 'react'
import { SiMediamarkt } from "react-icons/si";
import Price from './Price';
import { useSelector } from 'react-redux';
import { stateProps, storeProduct } from '@/data';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
interface CheckoutSession {
  id: string;
}
export default function Cartpayment() {

    const {productData, userInfo} = useSelector((state:stateProps)=>state.next)

    const [totalAmount, settotalAmount] = useState(0)
    useEffect(() => {
      let total =0
      productData.map((item:storeProduct)=>(
      total += item.price * item.quantity
        
    ))
    settotalAmount(total)
    }, [productData])
    
    // payment stripe

    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      const { data: session } = useSession();
      
    
      const handlePayment = async () => {
        const stripe = await stripePromise;
    
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: productData, email: session?.user?.email }),
        });
        const checkoutSession : CheckoutSession = await response.json();
    
        const result = await stripe?.redirectToCheckout({
          sessionId: checkoutSession.id,
        });
        if (result?.error) {
          alert(result?.error.message);
        }
      };

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
            <div className='bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1'>
                <SiMediamarkt/>
            </div>
            <p className='text-sm'>
            Your order qualifies for FREE Shipping by Choosing this option at
            checkout. See details....
            </p>
        </div>
        <p className='flex items-center justify-between px-2 font-semibold'>
            Total:{" "}
            <span className='font-bold text-xl'>
                <Price amount={totalAmount}/>
            </span>
        </p>
        <div className='flex flex-col items-center'>
            {userInfo?<button onClick={handlePayment} className='w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg hover:text-black hover:bg-amazon_yellow duration-300'>
                Proceed to Buy
            </button>:<div> <button className='w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed'>
                Proceed to Buy
            </button>
                        <p className='text-sm mt-1 text-red-500 font-semibold animate-pulse'>Please login to continue</p>
</div>
            }
        </div>
    </div>
  )
}
