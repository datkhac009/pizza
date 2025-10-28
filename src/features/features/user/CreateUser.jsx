import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { addName } from "./userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const dispatch = useDispatch();
  // const username = useSelector((s) => s.user.username);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addName(name.trim()));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-8 w-36 rounded-full border border-gray-400 pl-3 outline-none transition-all duration-300 ease-in-out 
             placeholder:text-sm placeholder:italic placeholder:text-gray-400 
             valid:text-sm focus:w-[200px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
      />

      {name && (
        <div className="mt-2">
          <button
            type="submit"
            className="mt-4 rounded-full bg-yellow-500 px-8 py-3 text-lg font-bold text-white"
          >
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
