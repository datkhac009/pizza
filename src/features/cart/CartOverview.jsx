import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="flex w-screen items-center justify-between bg-stone-800 p-4 uppercase text-stone-200 sm:text-stone-500">
      <div>
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>23 pizzas</span>
          <span>$23.45</span>
        </p>
      </div>
      <div>
        <Link to="cart">Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
