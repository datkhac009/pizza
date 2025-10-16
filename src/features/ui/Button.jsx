import { Link } from "react-router-dom";

function Button({ children, className, onClick, to, styleText }) {
  return (
    <div>
      <Link to={to}>
        <button className={className} onClick={onClick}>
          <p className={styleText}>{children}</p>
        </button>
      </Link>
    </div>
  );
}

export default Button;
