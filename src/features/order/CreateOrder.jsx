/* eslint-disable  */
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, getCart, getCartTotalPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress, setAddress, setPhone } from "../user/userSlice";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    String(str || "").trim(),
  );

const isValidName = (str) =>
  /^(?=.{2,50}$)[\p{L}\p{M}]+(?:[\s'.-][\p{L}\p{M}]+)*$/u.test(
    String(str || "").trim(),
  );
const isValidAddress = (str) =>
  /^(?=.{8,120}$)[\p{L}\p{M}\d\s,./-]+$/u.test(String(str || "").trim());

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  //console.log(navigation);
  const { position, address, error, status } = useSelector(
    (sliceuser) => sliceuser.user,
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
  if (!cart || cart.length === 0) return <EmptyCart />;
  const dispatch = useDispatch();
  // console.log(cart);
  // console.log(checkPriority);
  //console.log(username);
  console.log(formError);
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
            {/* message valid name */}
            {formError?.customer && (
              <p className="mt-1 text-sm text-red-600">{formError.customer}</p>
            )}
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
              onChange={(e) => dispatch(setPhone(e.target.value))}
              required
              className={`w-full rounded-md border border-stone-300 bg-white p-2 outline-none
                       focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200`}
            />
            {/* message valid phone */}
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
                onChange={(e) => dispatch(setAddress(e.target.value))}
                required
                className="flex-1  border border-stone-300 bg-white p-2 outline-none
                     focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
              <button
                disabled={status === "loading" || !!address} //!! là boolean nếu có address rồi thì sẽ là true
                type="button"
                onClick={() => {
                  dispatch(fetchAddress());
                }}
                className=" bg-yellow-400 px-4 py-2 text-sm font-semibold transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed
                       disabled:bg-stone-400"
              >
                Get Position
              </button>
            </div>
            {/* message valid address */}
            {formError?.address && (
              <p className="mt-1 text-sm text-red-600">{formError.address}</p>
            )}
          </div>
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
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
          <input
            type="hidden"
            name="cart"
            value={cart?.cart?.length ? JSON.stringify(cart.cart) : "[]"}
          />

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
export default CreateOrder;

export async function action({ request }) {
  // 1) Lấy dữ liệu từ form
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // 2) Chuẩn hóa object order
  const order = {
    ...data,
    cart: JSON.parse(data.cart || []), //chuyển chuỗi đó thành mảng/đối tượng JavaScript.
    phone: data.phone,
    address: data.address,
    priority: data.priority === "on",
  };

  // 3) Validate (các hàm isValid... phải return .test(...) )
  const errors = {};

  if (!isValidPhone(order.phone)) errors.phone = "Error Phone";
  if (!isValidName(order.customer)) errors.customer = "Error Name";
  if (!isValidAddress(order.address)) errors.address = "Error Address";

  // Có lỗi thì trả về cho useActionData
  if (Object.keys(errors).length > 0) return errors;

  // 4) Gọi API tạo order
  const newOrder = await createOrder(order); //await đợi cho hàm hoàn thành và sẽ lấy kết quả cuối cùng

  // 5) Clear cart (dispatch qua store đã export sẵn)
  store.dispatch(ClearCart());

  // 6) Lưu orderId vào localStorage để người dùng có thể tra cứu lại
  const savedOrders = JSON.parse(localStorage.getItem("recentOrders") || "[]");
  const newEntry = {
    id: newOrder.id,
    customer: order.customer,
    createdAt: new Date().toISOString(),
  };
  // Giữ tối đa 5 đơn hàng gần nhất
  const updated = [newEntry, ...savedOrders].slice(0, 5);
  localStorage.setItem("recentOrders", JSON.stringify(updated));

  // 7) Chuyển trang
  return redirect(`/order/${newOrder.id}`);
}
