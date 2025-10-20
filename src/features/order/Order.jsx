// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { calcMinutesLeft, formatCurrency, formatDate } from "../utils/helpers";
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
  } = order; //useLoaderData lấy data trước khi render
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Status: Order #{id}</h2>
        <div>
          {priority && (
            <span
              className="mr-4 rounded-full bg-red-500 px-3 py-1 text-sm
          font-semibold uppercase tracking-wide text-red-50"
            >
              Priority
            </span>
          )}
          <span
            className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold
          uppercase tracking-wide text-green-50"
          >
            {status} order
          </span>
        </div>
      </div>

      <div className="mx-10 my-7 flex items-center justify-between bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div className="mx-10 my-7 flex flex-col items-start bg-stone-200 px-6 py-5">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-lg font-semibold  text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <ul className="divide-y divide-stone-200">
        {cart.map((item) => {
          return <OrderItem item={item} key={item.pizzaId} />;
        })}
      </ul>
    </div>
  );
}
export default Order;
