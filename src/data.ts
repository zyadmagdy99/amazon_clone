export interface productProps {
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
export interface storeProduct {
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

export interface stateProps {
    productData:[];
    favouriteData:[];
    userInfo:null|string;
    next:any
}