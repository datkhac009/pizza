import { getOrder } from "../services/apiRestaurant";
export async function OrderLoader({ params }) {

  const order = await getOrder(params.orderId);
  if (!order) {
    throw new Response("Couldn't find order", {
      status: 404,
      statusText: "Not Found"
    });
  }
  return order;
} 