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
    <div className="flex justify-center bg-yellow-500 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2"
        />
      </form>
    </div>
  );
}

export default SearchOrder;
