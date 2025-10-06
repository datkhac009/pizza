import { Link } from "react-router-dom";
import Button from "../ui/Button";

const fakeCart = [
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
  {
    pizzaId: 51,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6 text-center">
      {/* Back */}
      <div>
        <Link to="/menu" className="text-sm text-yellow-600 hover:underline">
          &larr; Back to menu
        </Link>
      </div>

      {/* Cart title */}
      <h2 className="text-xl font-semibold">
        Your cart, <span className="text-yellow-600">%NAME%</span>
      </h2>

      {/* Cart items */}
      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <li key={item.pizzaId} className="flex justify-between py-3">
            <span className="font-medium">
              {item.quantity}× {item.name}
            </span>
            <span className="font-semibold text-stone-700">
              ${item.totalPrice}
            </span>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <Link to="/order/new">
          <Button
            variant="primary"
            className="rounded-xl bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
          >
            Order pizzas
          </Button>
        </Link>
        <Button
          variant="secondary"
          className="rounded-xl bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300"
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
