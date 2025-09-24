import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import UserName from './UserName';

function Header() {
  return (
    <div>
      <Link to="/" className="tracking-widest">Fast Pizza</Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
