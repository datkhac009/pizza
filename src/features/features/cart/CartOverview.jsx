import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice, getCartTotalQuantity } from "./CartSlice";

function CartOverview() {
  const totalQuantity = useSelector(getCartTotalQuantity);
  const TotalPrice = useSelector(getCartTotalPrice);
  return (
    <div className="flex w-screen items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 sm:text-stone-500">
      <div>
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{totalQuantity > 0 ? totalQuantity : 0} pizzas</span>
          <span>${TotalPrice > 0 ? TotalPrice : 0}</span>
        </p>
      </div>
      <div>
        <Link
          to="cart"
          className={`p-2 ${totalQuantity > 0 ? "bg-yellow-500 text-stone-100" : ""}`}
        >
          Open cart &rarr;
        </Link>
      </div>
    </div>
  );
}

export default CartOverview;
