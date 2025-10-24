import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddCart(state, action) {
      const item = action.payload;
      const qty = item.quantity ?? 1;
      const CartItem = state.cart.find((cid) => cid.pizzaId === item.pizzaId); //lấy item mà mình add
      if (CartItem) {
        CartItem.quantity += qty; //nếu add 2 lần thì nó sẽ + quantity lên
        CartItem.totalPrice = CartItem.quantity * CartItem.unitPrice; //Tính tổng giá tiền Lấy giá số lượng nhân với giá tiền hiện tại
      } else {
        state.cart.push({
          pizzaId: item.pizzaId,
          name: item.name,
          imageUrl: item.imageUrl,
          unitPrice: item.unitPrice,
          quantity: qty,
          totalPrice: qty * item.unitPrice,
        });
      }
    },
    DeleteCart(state, action) {
      const id = action.payload;
      state.cart = state.cart.filter((c) => c.pizzaId !== id);
    },
    Increment(state, action) {
      const id = action.payload;
      const item = state.cart.find((c) => c.pizzaId === id);
      console.log(item);
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
      if (item.quantity <= 0)
        state.cart = state.cart.filter((c) => c.pizzaId !== id);
    },
    ClearCart(state) {
      state.cart = [];
    },
  },
});

export const { AddCart, DeleteCart, Increment, Decrement, ClearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

//Get
export const getCart = (store) => store.cart;
export const getCartTotalQuantity = (store) =>{
  
  const totalquantity =  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0); //tính tổng quantity bằng reduce()
  return totalquantity;
}
export const getCartTotalPrice = (store) =>{
  const totalprice =  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0); //tính tổng price bằng reduce()
  return totalprice
}
export const getQuantityItem = (id) => (store) =>{
  const iditem = store.cart.cart.find((c)=> c.pizzaId === id)
  return iditem ? iditem.quantity : 0
}