import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { DeleteCart } from "./CartSlice";

function DeleteItem({ id }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        className="rounded-full bg-red-600 px-3 py-1"
        styleText="text-white"
        onClick={() => dispatch(DeleteCart(id))}
      >
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
