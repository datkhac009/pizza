// Test ID: IIDSAT

import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../utils/helpers";
import OrderItem from "./OrderItem";

function Order() {

  const order = useLoaderData();                    
  console.log("loaderData (from useLoaderData):", order);
  
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;//useLoaderData lấy data trước khi render
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  
  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Status: Order #{id}</h2>

        <div>
          {priority && <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold
          uppercase tracking-wide text-red-50 mr-4">Priority</span>}
                    <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold
          uppercase tracking-wide text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-stone-200 px-6 py-5 mx-10 my-7">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div className="flex flex-col items-start bg-stone-200 px-6 py-5 mx-10 my-7">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold text-stone-600  text-lg">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      <ul className="divide-y divide-stone-200">

      {cart.map((item) =>{
        return (
        <OrderItem item={item} key={item.key}/>
        )
      })}
      </ul>
    </div>
  );
}

export default Order;
