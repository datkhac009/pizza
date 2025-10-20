/* eslint-disable  */
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getCartTotalPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  //console.log(navigation);
  const { position, address, error, status } = useSelector(
    (store) => store.user,
  );
  console.log(status);
  // console.log(position, address, error, status);
  const submitting = navigation.state === "submitting";
  const formError = useActionData();
  const username = useSelector((s) => s.user.username);
  const cart = useSelector(getCart);
  const totalPriceSubmit = useSelector(getCartTotalPrice);
  const [checkPriority, setPriorityPrice] = useState(false);
  const priorityPrice = checkPriority ? totalPriceSubmit * 0.2 : 0;
  if (!cart || cart.cart.length === 0) return <EmptyCart />;
  const dispatch = useDispatch();
  console.log(cart);
  console.log(checkPriority);
  //console.log(username);
  //console.log(formError);
  return (
    <div className="px-4 py-8">
      {/* Tiêu đề trang */}
      <h2 className="mb-6 text-center text-xl font-semibold">
        Ready to order? Let's go!
      </h2>
      <Form
        method="POST"
        action="/order/new"
        className="mx-auto mb-10 w-full max-w-xl rounded-lg p-6"
      >
        <div className="grid gap-5">
          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="customer"
              className="mb-1 text-sm font-medium text-stone-700"
            >
              First Name
            </label>
            <input
              id="customer"
              name="customer"
              type="text"
              defaultValue={username}
              required
              className="w-full rounded-md border border-stone-300 bg-white p-2 outline-none
                       focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="mb-1 text-sm font-medium text-stone-700"
            >
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              aria-invalid={Boolean(formError?.phone) || undefined}
              className={`w-full rounded-md border border-stone-300 bg-white p-2 outline-none
                       focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 ${
                         formError?.phone
                           ? "border-red-500"
                           : "border-stone-300"
                       }`}
            />
            {formError?.phone && (
              <p className="mt-1 text-sm text-red-600">{formError.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="mb-1 text-sm font-medium text-stone-700"
            >
              Address
            </label>

            <div className="flex items-center ">
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={address}
                required
                className="flex-1  border border-stone-300 bg-white p-2 outline-none
                     focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
              <button
                disabled={status === "loading"}
                type="button"
                onClick={() => dispatch(fetchAddress())}
                className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed
                       disabled:bg-stone-400"
              >
                Get Position
              </button>
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-center gap-2">
            <input
              id="priority"
              name="priority"
              type="checkbox"
              onChange={(e) => setPriorityPrice(e.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-yellow-500 focus:ring-yellow-400"
            />
            <label htmlFor="priority" className="text-sm text-stone-800">
              Want to give your order priority?
            </label>
          </div>

          {/* Hidden cart */}
          <input type="hidden" name="cart" value={JSON.stringify(cart.cart)} />

          {/* Submit */}
          <button
            disabled={submitting}
            className="mt-2 w-full rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase
                     tracking-wide text-stone-800 transition-colors duration-300
                     hover:bg-yellow-500 focus:bg-yellow-300 disabled:cursor-not-allowed
                     disabled:bg-stone-400"
          >
            {submitting
              ? "Placing order..."
              : `Order now $${priorityPrice ? totalPriceSubmit + priorityPrice : totalPriceSubmit}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //1
  const formData = await request.formData(); //giữ liệu từ Form gửi về
  const data = Object.fromEntries(formData); //chuyển những cặp này thành một object JS :
  console.log(data);

  const order = {
    //2
    ...data,
    cart: JSON.parse(data.cart), //chuyển chuỗi đó thành mảng/đối tượng JavaScript.
    priority: data.priority === "on",
  };

  console.log(order); //4 Validate Form
  const errors = {}; // tao ra 1 object error
  if (!isValidPhone(order.phone))
    //isValidPhone là 1 const regex ở trên.
    errors.phone = "Error Phone";
  if (Object.keys(errors).length > 0) return errors; // Nếu trong object errors mà có value lỗi thì nó trả về errors để có value lỗi để hiện thi trên ui
  console.log(order);

  //3 truyền oder vào createOrder
  const newOrder = await createOrder(order); //await đợi cho hàm hoàn thành và sẽ lấy kết quả cuối cùng
  //Khi create và Validate xong nó sẽ redirect (chuyển hướng) đến trang oder/:id
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
