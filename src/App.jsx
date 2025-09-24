import React from "react";
import Home from "./features/ui/Home";
import Error from "./features/ui/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Menu, { Loader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, { action as CreateActions } from "./features/order/CreateOrder";
import Applayout from "./features/ui/Applayout";
import Order from "./features/order/Order";
import { OrderLoader } from "./features/order/orderLoader";
import NotFound from "./features/ui/NotFound";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Applayout />, //Layout route
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: Loader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action : CreateActions,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: OrderLoader,
      
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
