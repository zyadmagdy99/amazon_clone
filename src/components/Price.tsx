import React from 'react'
interface Props {
    amount : number
}
export default function Price({amount}:Props) {
    const amountP = new Number(amount).toLocaleString("en-us",{
        style:"currency",currency:"USD",minimumFractionDigits:2
    })
  return (
    <span>
      {amountP}
    </span>
  )
}
