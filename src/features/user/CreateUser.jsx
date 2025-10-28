import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { addName } from "./userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsSubmitting(true);
    dispatch(addName(name.trim()));
    
    // Small delay for better UX
    setTimeout(() => {
      navigate("/menu");
    }, 300);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Welcome Message */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">
            Welcome to Pizza By Dat!
          </h2>
          <p className="text-stone-600">
            Let's get started by telling us your name
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64 px-6 py-2 text-lg border-2 border-stone-300 rounded-full bg-white shadow-sm transition-all duration-100 ease-in-out placeholder:text-stone-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200 focus:shadow-lg focus:outline-none"
              disabled={isSubmitting}
            />
            {name && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          {name.trim() && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-72 px-6 py-2 text-xl font-bold text-white bg-yellow-500 rounded-full shadow-lg transition-all duration-300 hover:bg-yellow-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Starting...
                </div>
              ) : (
                "Start ordering"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
