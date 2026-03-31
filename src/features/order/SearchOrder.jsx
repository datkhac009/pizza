import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  // Load recent orders từ localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentOrders") || "[]");
    setRecentOrders(saved);
  }, [showDropdown]); // reload mỗi khi dropdown mở

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
    setShowDropdown(false);
  }

  function handleSelectOrder(id) {
    navigate(`/order/${id}`);
    setShowDropdown(false);
    setQuery("");
  }

  // Lọc danh sách theo query đang nhập (nếu có)
  const filtered = query
    ? recentOrders.filter((o) =>
        o.id.toLowerCase().includes(query.toLowerCase()),
      )
    : recentOrders;

  return (
    <div className="relative flex max-w-7xl justify-center bg-yellow-500 p-4" ref={wrapperRef}>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <input
          type="text"
          value={query}
          placeholder="Search Order #ID"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="w-64 rounded-full border border-gray-400 px-4 py-1 outline-none 
             transition-all duration-300 ease-in-out 
             focus:w-[300px] focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 max-sm:w-44 max-sm:focus:w-[200px]"
        />
      </form>

      {/* Dropdown recent orders */}
      {showDropdown && recentOrders.length > 0 && (
        <div className="absolute top-full left-1/2 z-50 mt-1 w-72 -translate-x-1/2 rounded-xl border border-yellow-200 bg-white shadow-xl">
          <p className="border-b border-stone-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
             Recent Orders
          </p>
          <ul>
            {filtered.length > 0 ? (
              filtered.map((order) => (
                <li key={order.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectOrder(order.id)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-yellow-50"
                  >
                    <div>
                      <span className="font-mono font-semibold text-stone-800">
                        #{order.id}
                      </span>
                      {order.customer && (
                        <span className="ml-2 text-sm text-stone-500">
                          {order.customer}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-stone-400">
                      {formatDate(order.createdAt)}
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-stone-400">
                No matching orders
              </li>
            )}
          </ul>
          <div className="border-t border-stone-100 px-4 py-2">
            <p className="text-xs text-stone-400">
               Tip: Type an order ID to search, or click a recent order above
            </p>
          </div>
        </div>
      )}

      {/* Dropdown khi chưa có lịch sử */}
      {showDropdown && recentOrders.length === 0 && (
        <div className="absolute top-full left-1/2 z-50 mt-1 w-64 -translate-x-1/2 rounded-xl border border-yellow-200 bg-white px-4 py-3 shadow-xl">
          <p className="text-sm text-stone-500">
             No recent orders found.
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Enter an order ID above to track your order.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchOrder;
