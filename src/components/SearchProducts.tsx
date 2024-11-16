import Price from "./Price";

interface props {
    _id:number;
    title:string;
    description:string;
    oldPrice:number;
    price:number;
    brand:string;
    image:string;
    isNew:boolean;
    category:string
}
type item ={
    item : props
}

export default function SearchProducts({item}:item) {
  return (
    <div className="flex items-center gap-4">
    <img className='w-24' src={item.image} alt="item image" />
        <div>
            <p className="text-xs -mb-1">
                {item.brand}_{item.category}
            </p>
            <p className="text-lg font-medium">{item.title}</p>
            <p className="text-xs">{item.description.substring(0,100)}</p>
            <p className="text-sm flex items-center gap-1">

            price:{" "}
                        <span className=' font-semibold'>
                            <Price amount={item.price}/>
                        </span>
            <span className='text-gray-600 line-through'>
                            <Price amount={item.oldPrice}/>
                        </span>
            </p>
        </div>
        <div className="flex-1 text-right px-4">  
      <p className=' text-amazon_blue font-semibold text-base tracking-wide animate-pulse'>save <Price amount={item.oldPrice - item.price} />  </p> 
        </div>
    </div>
  )
}
