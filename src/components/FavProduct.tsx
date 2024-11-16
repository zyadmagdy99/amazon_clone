import Image from "next/image";
import React from "react";
import Price from "./Price";
import { useDispatch } from "react-redux";
import { addToCart, deleteFav } from "@/lib/nextSlice";

interface product {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
}
interface item {
  item: product;
}

export default function FavProduct({ item }: item) {
  let dispatch = useDispatch();
  return (
    <div className="bg-gray-100 rounded-lg flex flex-col md:flex-row py-2 items-center gap-4 mb-2">
      <Image src={item.image} alt="product image" width={150} height={150} />
      <div className="flex items-center px-2 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-amazon_blue">{item.title}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span>
              <Price amount={item.price} />
            </span>
          </p>
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  _id: item._id,
                  brand: item.brand,
                  category: item.category,
                  description: item.description,
                  image: item.image,
                  isNew: item.isNew,
                  oldPrice: item.oldPrice,
                  price: item.price,
                  title: item.title,
                  quantity: 1,
                })
              );  dispatch(deleteFav(item._id));
            }}
            className="h-10 w-44 font-medium bg-amazon_blue text-white rounded-md hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
          >
            add to cart
          </button>
        </div>
        <div className="text-amazon_blue text-lg font-semibold">
            <Price amount={item.price}/>
        </div>
      </div>
    </div>
  );
}
