import { formatCurrency } from "../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="mx-10 flex items-center justify-between px-6 py-3">
      <p className="">
        <span className="text-right text-xl tabular-nums text-stone-950">
          {quantity}×
        </span>{" "}
        {name}
      </p>

      {/* cột giá cố định, căn phải, số thẳng hàng */}
      <p className="min-w-[6rem] text-right text-lg font-semibold tabular-nums text-stone-950">
        {formatCurrency(totalPrice)}
      </p>
    </li>
  );
}

export default OrderItem;
