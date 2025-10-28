import { useSelector } from "react-redux";
import CreateUser from "../user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((s) => s.user.username);
  return (
    <div>
      <h1
        className="text-3xl font-bold  leading-[2.75rem] max-md:text-2xl
       max-sm:text-lg max-sm:text-yellow-500 max-[430px]:text-sm"
      >
        The best pizza.
        <br />
        <span
          className="text-yellow-500 max-md:text-2xl 
        max-sm:text-lg max-sm:font-bold max-sm:text-black max-[430px]:text-sm"
        >
          Straight out of the oven, straight to you.
        </span>
        <div>
          {username === "" ? (
            <CreateUser />
          ) : (
            <Button
              to="/menu"
              className="mt-4 rounded-full bg-yellow-500 px-8 py-3 
             text-lg font-bold text-white shadow-md 
             transition-transform duration-300 hover:scale-105 hover:bg-yellow-600 
             focus:outline-none focus:ring-4 focus:ring-yellow-300"
            >
              Continue ordering, {username}
            </Button>
          )}
        </div>
      </h1>
    </div>
  );
}

export default Home;
