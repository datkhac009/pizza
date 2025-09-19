import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";

function Header() {
  return (
    <div>
      <Link to="/">Fast Pizza</Link>
      <SearchOrder />
      <p>By Dat</p>
    </div>
  );
}

export default Header;
