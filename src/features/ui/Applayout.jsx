import { Outlet, useLocation, useNavigation } from "react-router-dom";
import CartOverview from "../cart/CartOverview";
import Header from "./Header";
import Loading from "./Loading";
import { useEffect, useRef, useState } from "react";

const TITLES = {
"/": "Pizza By Dat",
"/menu": "Menu | Pizza By Dat",
"/cart": "Cart | Pizza By Dat",
"/order/new" : "Order pizzas | Pizza By Dat",
};

function Applayout() {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  const {pathname} = useLocation()
  console.log(pathname)

  useEffect(() => {
   if(!pathname) return;
   document.title = TITLES[pathname] ? TITLES[pathname] : "Pizza By Dat";
    
  }, [pathname])
  

  useEffect(() => {
  
    const handleScroll = () => {
      const current = window.scrollY;
      
      if (current > lastY.current) {
        // scroll down
        setShow(true);
      } else if (current < lastY.current) {
        // scroll up
        setShow(false);
      }
      lastY.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(show);
  const navigation = useNavigation();
  const isLoanding = navigation.state === "loading";
  return (
    <div className="layout text-center">
      {isLoanding && <Loading />}
      <header className="bg-yellow-500 px-3 py-4 uppercase">
        <Header />
      </header>
      <main className="">
        <Outlet />
      </main>
      <footer>
        <div
          className={`fixed bottom-0 left-0 right-0 flex h-14 items-center 
              justify-between bg-neutral-900 text-white shadow-lg
              transition-transform duration-500 ease-in-out
              ${show ? "translate-y-0" : "translate-y-full"}`}
        >
          {show && <CartOverview />}
        </div>
      </footer>
    </div>
  );
}

export default Applayout;
