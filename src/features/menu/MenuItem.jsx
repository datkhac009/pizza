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
    <li
      className={`mb-4 list-none ${
        soldOut ? "cursor-not-allowed  opacity-60" : ""
      }`}
    >
      <img src={imageUrl} alt={name} className="h-full w-screen object-cover" />
      <div>
        <p className="mt-3 text-lg font-semibold text-stone-800">{name}</p>
        <p className="text-sm italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-1 font-bold text-stone-600">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
      {!soldOut && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            className="inline-flex items-center justify-center
               rounded-full bg-yellow-400 px-6 py-2.5
               font-semibold uppercase tracking-wide text-stone-900
               shadow-sm transition-all duration-200
               hover:bg-yellow-500 hover:shadow-md
               focus:outline-none focus:ring-4 focus:ring-yellow-200
               disabled:cursor-not-allowed disabled:bg-stone-300"
            onClick={handleAddtoCart}
          >
            ADD TO CART
          </Button>
          <div>
            {totalQuantity > 0 && (
              <DeleteItem
                id={id}
                className="appearance-none rounded-full border border-red-500
             bg-red-50 px-4 py-2 text-red-600
             transition hover:border-red-600
             hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-200"
              />
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default MenuItem;
