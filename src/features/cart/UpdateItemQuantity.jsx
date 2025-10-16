import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { Decrement, Increment } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center">
      <Button
        className="btn-decrement mr-2 cursor-pointer rounded-[100%] bg-gray-200 px-3 py-1 hover:bg-red-600"
        onClick={() => dispatch(Decrement(pizzaId))}
      >
        -
      </Button>
      <span className="mr-2  text-lg font-medium max-sm:text-sm">
        {currentQuantity}
      </span>
      <Button
        className=" btn-increment cursor-pointer rounded-[100%] bg-gray-200 px-3 py-1 hover:bg-yellow-500"
        onClick={() => dispatch(Increment(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
