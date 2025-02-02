import { storeProduct } from './../../data';
import { NextApiRequest, NextApiResponse } from "next";


import Stripe from "stripe";
interface Item {
  image: string;

}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items, email } = req.body;
  
  
  const modifiedItems = (items).map((item:storeProduct) => ({
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["BD", "US", "OM", "CA", "GB"],
    },
    line_items: modifiedItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    metadata: {
      email,
      images: JSON.stringify((items ?? []).map((item: Item) => item.image 
      )),
    },
  });
  res.status(200).json({
    id: session.id,
  });
}