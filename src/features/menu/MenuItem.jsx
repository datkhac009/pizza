import { useDispatch } from "react-redux";
import { formatCurrency } from "../utils/helpers";
import Button from "./../ui/Button";
import { AddCart } from "../cart/CartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

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
        <Button
          className="mt-6 inline-block w-[50%] 
      rounded-full bg-yellow-400 px-3 py-2
      font-semibold uppercase tracking-wide text-stone-800 
      transition-colors duration-300 hover:bg-yellow-500 focus:bg-yellow-300 
      disabled:cursor-not-allowed disabled:bg-stone-400 
      max-xl:px-2 max-xl:py-2 max-lg:px-2 max-lg:py-2 max-sm:px-2 md:w-[60%]"
          onClick={handleAddtoCart}
        >
          ADD TO CARD
        </Button>
      )}
    </li>
  );
}

export default MenuItem;
