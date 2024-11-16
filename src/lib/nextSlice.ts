import { storeProduct } from './../data';
import { createSlice } from "@reduxjs/toolkit";


interface state {
    productData : storeProduct[],
    favouriteData : storeProduct[],
    allProducts : storeProduct[],
    userInfo : null | string,
}

const initialState:state = {
    productData :[],
    favouriteData:[],
    allProducts:[],
    userInfo:null
}

export const nextSlice = createSlice({
    name : "next",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
              const exisitingProduct = state.productData.find((product:storeProduct)=>product._id===action.payload._id);
              if(exisitingProduct){
                exisitingProduct.quantity += action.payload.quantity;
              }else{
                state.productData.push(action.payload)
              }
        },
        addToFavorite:(state,action)=>{
              const exisitingProduct = state.favouriteData.find((product:storeProduct)=>product._id===action.payload._id);
              if(exisitingProduct){
                exisitingProduct.quantity += action.payload.quantity;
              }else{
                state.favouriteData.push(action.payload)
              }
        },
        increaseQuantity:(state,action)=>{
          const exisitingProduct = state.productData.find((product:storeProduct)=>product._id===action.payload._id);
          if (exisitingProduct) {
            exisitingProduct.quantity++;
          }        },
        decreaseQuantity:(state,action)=>{
          const exisitingProduct = state.productData.find((product:storeProduct)=>product._id===action.payload._id);
          if(exisitingProduct?.quantity ===1){
            exisitingProduct.quantity=1
          }else{
            exisitingProduct!.quantity--
          }
        },
        deleteProduct:(state,action)=>{
          state.productData = state.productData.filter((product)=>product._id!==action.payload._id)          
        },
        deleteFav:(state,action)=>{
          state.favouriteData = state.favouriteData.filter((product)=>product._id!==action.payload)          
        },
        reset:(state)=>{
          state.productData =[]
        },
        resetFav:(state)=>{
          state.favouriteData =[]
        },
        addUser:(state,action)=>{
          state.userInfo = action.payload
        },
        removeUser:(state)=>{
          state.userInfo = null
        },
        setAllProduct:(state,action)=>{
          state.allProducts = action.payload
        }
    }
})

export const {addToCart,resetFav,setAllProduct,removeUser,deleteFav,addUser,reset,deleteProduct,decreaseQuantity,increaseQuantity,addToFavorite } = nextSlice.actions;
export  const nextReducer = nextSlice.reducer