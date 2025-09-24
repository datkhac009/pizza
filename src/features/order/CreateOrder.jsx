import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
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
  const navigation = useNavigation()
  console.log(navigation)
  const submitting = navigation.state === "submitting"
const formError = useActionData() 
console.log(formError)
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required /> <br />
            {formError ? formError?.phone : ""}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={submitting}>{submitting ? "Placing oder..." : "Oder now"}</button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) { //1
  const formData = await request.formData(); //giữ liệu từ Form gửi về
  const data = Object.fromEntries(formData); //chuyển những cặp này thành một object JS :
  console.log(data)

  const order = { //2
    ...data,
    cart: JSON.parse(data.cart), //chuyển chuỗi đó thành mảng/đối tượng JavaScript.
    priority: data.priority === "on",
  };
  
  console.log(order)//4
  const errors = {} // tao ra 1 object error
  if(!isValidPhone(order.phone)) //isValidPhone là 1 const regex ở trên.
    errors.phone = "Error Phone";
  if(Object.keys(errors).length > 0) return errors;// Nếu trong object errors mà có value lỗi thì nó trả về errors để có value lỗi để hiện thi trên ui
  console.log(order);
  
  const newOrder = await createOrder(order);//3
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
