import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../cart/CartOverview";
import Header from "./Header";
import Loading from "./Loading";
function Applayout() {

  const navigation =  useNavigation()
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

      
        <CartOverview />
      
    </div>
  );
}

export default Applayout;
