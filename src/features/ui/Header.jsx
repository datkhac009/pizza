import { Link, useNavigate } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../user/userSlice";

function Header() {
  const username = useSelector((s) => s.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy chữ viết tắt từ tên (vd: "Dat Khac" → "DK", "dat" → "D")
  const initials = username
    ? username
        .trim()
        .split(" ")
        .map((w) => w[0].toUpperCase())
        .slice(0, 2)
        .join("")
    : null;

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold tracking-tight text-stone-900 max-sm:text-base"
      >
        FAST PIZZA CO.
      </Link>

      {/* Search */}
      <SearchOrder />

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* History button */}
        <Link
          to="/order/history"
          title="Order History"
          className="flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-stone-700 shadow-sm transition-all hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
        >
          {/* Clock icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          History
        </Link>

        {/* User avatar + Logout */}
        {initials ? (
          <div className="flex items-center gap-2">
            {/* Avatar circle */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-800 text-xs font-bold text-yellow-400 shadow-md ring-2 ring-yellow-400 ring-offset-1 ring-offset-yellow-500"
              title={username}
            >
              {initials}
            </div>
            {/* Name — ẩn trên màn nhỏ */}
            <span className="hidden text-sm font-semibold text-stone-800 sm:block">
              {username}
            </span>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-400 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-500"
            >
              {/* Power icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
