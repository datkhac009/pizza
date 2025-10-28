import { useSelector } from "react-redux";
import CreateUser from "../user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((s) => s.user.username);
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 mb-4">
            The best pizza.
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-yellow-600 font-semibold mb-8">
            Straight out of the oven, straight to you.
          </p>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center space-y-6">
          {username === "" ? (
            <CreateUser />
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-stone-600">
                Welcome back, <span className="font-semibold text-yellow-600">{username}</span>!
              </p>
              <Button
                to="/menu"
                className="inline-flex items-center px-8 py-4 text-xl font-bold text-white bg-yellow-500 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                Continue ordering
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
