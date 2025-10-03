import { useState } from "react";
import Button from "../ui/Button";
import { Form, useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return;
    navigate("/order/new")
    setUsername("")
  }

  return (
    <Form onSubmit={handleSubmit} method="POST">
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-8 w-36 rounded-full border border-gray-400 pl-3 outline-none transition-all duration-300 ease-in-out 
             placeholder:text-sm placeholder:italic placeholder:text-gray-400 
             valid:text-sm focus:w-[200px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
      />

      {username !== "" && (
        <div className="mt-2">
          <Button className="mt-4 rounded-full bg-yellow-500 px-8 py-3 
             text-lg font-bold text-white shadow-md 
             transition-transform duration-300 hover:scale-105 hover:bg-yellow-600 
             focus:outline-none focus:ring-4 focus:ring-yellow-300">Start ordering</Button>
        </div>
      )}
    </Form>
  );
}

export default CreateUser;
