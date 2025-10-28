import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/helpers";
import Button from "./../ui/Button";
import { AddCart, getQuantityItem } from "../cart/CartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const totalQuantity = useSelector(getQuantityItem(id));
  //console.log(totalQuantity)
  function handleAddtoCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice: Number(unitPrice),
      imageUrl,
      quantity: 1,
    };

    dispatch(AddCart(newItem));
  }
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${
        soldOut ? "cursor-not-allowed opacity-60" : "hover:-translate-y-1"
      }`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {soldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-stone-800 mb-2">{name}</h3>
        <p className="text-sm text-stone-600 mb-4 line-clamp-2">
          {ingredients.join(", ")}
        </p>
        
        {/* Price */}
        <div className="mb-4">
          {!soldOut ? (
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(unitPrice)}
              </div>
              {totalQuantity > 0 && (
                <div className="text-sm text-stone-500">
                </div>
              )}
            </div>
          ) : (
            <span className="text-lg font-semibold text-red-500">Sold out</span>
          )}
        </div>

        {/* Actions */}
        {!soldOut && (
          <div className="flex items-center justify-between">
            {totalQuantity > 0 ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-stone-600">
                  In cart: {totalQuantity}
                </span>
                <DeleteItem
                  id={id}
                  className="rounded-full border border-red-500 bg-red-50 px-3 py-1 text-sm text-red-600 transition hover:border-red-600 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
            ) : (
              <Button
                className="w-full rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-stone-900 transition-all duration-200 hover:bg-yellow-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
                onClick={handleAddtoCart}
              >
                Add to Cart
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MenuItem;
