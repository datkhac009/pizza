import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { DeleteCart } from "./CartSlice";

function DeleteItem({ id, className }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Button className={className} onClick={() => dispatch(DeleteCart(id))}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteItem;
