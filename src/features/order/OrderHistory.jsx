import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentOrders") || "[]");
    setOrders(saved);
  }, []);

  function handleRemoveOrder(id) {
    const updatedOrders = orders.filter((o) => o.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("recentOrders", JSON.stringify(updatedOrders));
  }

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h2 className="mb-6 text-xl font-semibold">Your Order History</h2>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-8 text-center">
          <p className="text-stone-500 mb-4">
            No previous orders found. Start ordering some pizza
          </p>
          <Link
            to="/menu"
            className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
          >
            Go to menu
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
          {orders.map((order) => (
            <li
              key={order.id}
              className="py-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-stone-800">
                  Order #{order.id}
                </span>
                <span className="text-sm text-stone-500">
                  {order.customer} &bull; {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRemoveOrder(order.id)}
                  className="inline-block rounded-full border-2 border-stone-300 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-stone-500 transition-colors hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2"
                >
                  Remove
                </button>
                <Link
                  to={`/order/${order.id}`}
                  className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
                >
                  Track Order
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
