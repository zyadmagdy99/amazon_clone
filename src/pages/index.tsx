import Banner from "@/components/Banner";
import Products from "@/components/products";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { productProps } from "@/data";
import { useDispatch } from "react-redux";
import { setAllProduct } from "@/lib/nextSlice";
import { useEffect } from "react";

interface props {
  data : productProps[]
}

export default function Home({data} :props) {
  const dispatch = useDispatch()
  useEffect(() => {
    
  dispatch(setAllProduct({allProduct : data}))
  
  }, [data])
  
  return (
  
    <main className="">
   
      <div className="max-w-screen-2xl mx-auto">
      <Banner />   
      <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
      <Products data={data}/>
        </div>     
      </div>
        
    </main>
  );
}

export const getServerSideProps = async ()=>{
  const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
  const data = await res.json();
  return { props: { data }};
}