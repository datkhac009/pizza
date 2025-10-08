import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <div className="flex max-w-7xl justify-center bg-yellow-500 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 rounded-full border border-gray-400 px-4 py-1 outline-none 
             transition-all duration-300 ease-in-out 
             focus:w-[300px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 max-sm:w-44 max-sm:focus:w-[200px]"
        />
      </form>
    </div>
  );
}

export default SearchOrder;
