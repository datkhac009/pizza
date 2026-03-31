import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import UserName from './UserName';

function Header() {
  return (
    <div className="flex justify-around items-center">
      <Link to="/" className="text-2xl font-medium max-sm:text-xl">Fast Pizza Co.</Link>
      <SearchOrder />
      <div className="flex items-center gap-4">
        <Link 
          to="/order/history" 
          className="text-sm font-semibold uppercase tracking-wide text-stone-800 hover:text-stone-600 transition-colors"
          title="Order History"
        >
          History
        </Link>
        <UserName />
      </div>
    </div>
  );
}

export default Header;
