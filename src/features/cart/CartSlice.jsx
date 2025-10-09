import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      pizzaId: 12,
      name: "Pizza Pig",
      quantity: 5,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart: {
      prepare(newItem) {
        console.log(newItem);
        return { payload: newItem };
      },
      reducer(state, action) {
        state.cart.push(action.payload); // push “Mutate” = sửa trực tiếp
      },
    },
    DeleteCart(state, action) {
      //delete
      const id = action.payload;
      state.cart = state.cart.filter((c) => c.pizzaId !== id);
    },
    Increment(state, action) {
      const id = action.payload;
      const item = state.cart.find((c) => c.pizzaId === id);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    Decrement(state, action) {
      const id = action.payload;
      const item = state.cart.find((c) => c.pizzaId === id);
      if (item) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.unitPrice;
      }
      if (item.quantity <= 0) state.cart.filter((c) => c.pizzaId !== id);
    },
    ClearCart(state) {
      state.cart = [];
    },
  },
});

export const { AddCart, DeleteCart, Increment, Decrement, ClearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
