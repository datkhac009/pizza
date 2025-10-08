import { formatCurrency } from "../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex items-center justify-between px-6 py-3 mx-10">
      <p className="">
        <span className="text-xl text-right tabular-nums text-stone-950">{quantity}×</span> {name}
      </p>

      {/* cột giá cố định, căn phải, số thẳng hàng */}
      <p className="min-w-[6rem] text-lg text-right font-semibold tabular-nums text-stone-950">
        {formatCurrency(totalPrice)}
      </p>
    </li>
  );
}

export default OrderItem;
