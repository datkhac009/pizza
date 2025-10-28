import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import UserName from './UserName';

function Header() {
  return (
    <div className="flex justify-around items-center">
      <Link to="/" className="text-2xl font-medium max-sm:text-xl">Fast Pizza Co.</Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
