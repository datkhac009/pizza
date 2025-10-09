import { Link } from "react-router-dom";

function Button({ children, className, onClick, to }) {
  return (
    <div>
      <Link to={to}>
        <button className={className} onClick={onClick}>
          {children}
        </button>
      </Link>
    </div>
  );
}

export default Button;
