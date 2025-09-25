import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import UserName from './UserName';

function Header() {
  return (
    <div className="flex justify-around items-center">
      <Link to="/" className="tracking-widest">Fast Pizza Co.</Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
