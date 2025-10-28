import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartTotalPrice, getCartTotalQuantity } from "./CartSlice";
import { formatCurrency } from "../utils/helpers";
import { useEffect, useState } from "react";

function CartOverview() {
  const totalQuantity = useSelector(getCartTotalQuantity);
  const TotalPrice = useSelector(getCartTotalPrice);
  const [priceAnimation, setPriceAnimation] = useState(false);
  
  // Animation khi price thay đổi
  useEffect(() => {
    setPriceAnimation(true);
    const timer = setTimeout(() => setPriceAnimation(false), 300);
    return () => clearTimeout(timer);
  }, [TotalPrice]);
  
  return (
    <div className="flex w-full items-center justify-between bg-gradient-to-r from-stone-800 to-stone-900 px-6 py-4 text-white shadow-lg">
      {/* Cart Info */}
      <div className="flex items-center space-x-6">
        {/* Quantity Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-stone-900 shadow-lg">
            {totalQuantity}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-stone-300">
              {totalQuantity === 1 ? 'pizza' : 'pizzas'}
            </span>
            <span className="text-xs text-stone-400">in cart</span>
          </div>
        </div>
        
        {/* Price Display */}
        <div className="flex flex-col items-end">
          <div className={`text-xl font-bold text-yellow-400 transition-all duration-300 ${
            priceAnimation ? 'scale-110 text-yellow-300' : 'scale-100'
          }`}>
            {formatCurrency(TotalPrice)}
          </div>
          <span className="text-xs text-stone-400">total</span>
        </div>
      </div>

      {/* Open Cart Button */}
      <Link
        to="cart"
        className="group flex items-center space-x-2 rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-stone-900 transition-all duration-200 hover:bg-yellow-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        <span>Open cart</span>
        <svg 
          className="h-4 w-4 transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

export default CartOverview;
