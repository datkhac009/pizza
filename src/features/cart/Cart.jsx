import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart } from "./CartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function Cart() {
  const cart = useSelector((c) => c.cart.cart);
  const checkCart = cart.length;
  const username = useSelector((s) => s.user.username);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <Link to="/menu" className="text-sm text-yellow-600 hover:underline">
          &larr; Back to menu
        </Link>
      </div>
      {checkCart > 0 ? (
        <div className="mx-auto max-w-2xl space-y-6 p-6 text-center">
          <h2 className="text-xl font-semibold">
            Your cart, <span className="text-yellow-600">{username}</span>
          </h2>

          <ul className="divide-y divide-stone-200 border-b border-t">
            {cart.map((item) => (
              <li
                key={item.pizzaId}
                className="grid grid-cols-[1fr_1fr_1fr_auto] items-start gap-4 py-3"
              >
                <span className="text-left font-medium">
                  {item.quantity}× <span className="text-lg">{item.name}</span>
                </span>
                <span className="min-w-[50px] text-center text-lg font-bold text-stone-700">
                  ${item.totalPrice}
                </span>
                <UpdateItemQuantity
                  pizzaId={item.pizzaId}
                  currentQuantity={item.quantity}
                />
                <DeleteItem id={item.pizzaId} />
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              to="/order/new"
              variant="primary"
              className="rounded-xl bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
            >
              Order pizzas
            </Button>

            <Button
              onClick={() => dispatch(ClearCart())}
              variant="secondary"
              className="rounded-xl bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300"
            >
              Clear cart
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xl">Order Pizza On The Menu </p>
      )}
    </>
  );
}

export default Cart;
