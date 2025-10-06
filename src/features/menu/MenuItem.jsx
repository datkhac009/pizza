import { formatCurrency } from "../utils/helpers";
import Button from "./../ui/Button";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="mb-4 list-none">
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
      <Button className="mt-6 inline-block w-[50%] rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-500 focus:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-stone-400">
        ADD TO CARD
      </Button>
    </li>
  );
}

export default MenuItem;
