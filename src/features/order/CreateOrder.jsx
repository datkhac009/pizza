import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  console.log(navigation);
  const submitting = navigation.state === "submitting";
  const formError = useActionData();
  console.log(formError);
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form
        method="POST"
        action="/order/new"
        className="mx-auto mb-10 max-w-3xl p-6"
      >
        <h2 className="mb-6 text-center text-xl font-semibold">
          Ready to order? Let's go!
        </h2>

        <div className="grid gap-5">
          {/* First Name */}
          <div className="flex flex-col items-center">
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
              required
              className="w-3/6 rounded-md border border-stone-300 bg-white p-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center">
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
              className={`w-3/6 rounded-md border bg-white p-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 ${
                formError?.phone ? "border-red-500" : "border-stone-300"
              }`}
            />
            {formError?.phone && (
              <p className="mt-1 text-sm text-red-600">{formError.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="address"
              className="mb-1 text-sm font-medium text-stone-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="w-3/6 rounded-md border border-stone-300 bg-white p-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          {/* Priority */}
          <div className="m-auto flex items-center gap-2">
            <input
              id="priority"
              name="priority"
              type="checkbox"
              className="h-4 w-4 rounded border-stone-300 text-yellow-500 focus:ring-yellow-400"
            />
            <label htmlFor="priority" className="text-sm text-stone-800">
              Want to give your order priority?
            </label>
          </div>

          {/* Hidden cart */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* Submit */}
          <div className="pt-2">
            <button
              disabled={submitting}
              className="inline-block w-[50vw] rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-500 focus:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              {submitting ? "Placing order..." : "Order now"}
            </button>
          </div>
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

  const newOrder = await createOrder(order); //3
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
