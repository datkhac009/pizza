import { Link } from "react-router-dom";

function Button({
  children,
  className,
  onClick,
  to,
  styleText,
  type,
  disabled,
}) {
  return (
    <div>
      {to ? ( //nếu như mà có to truyền xuống nó sẽ là button link còn nếu không có to truyền xuống thì nó sẽ là button bình thường
        <Link to={to}>
          <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
          >
            <p className={styleText}>{children}</p>
          </button>
        </Link>
      ) : (
        <button
          type={type}
          className={className}
          onClick={onClick}
          disabled={disabled}
        >
          <p className={styleText}>{children}</p>
        </button>
      )}
    </div>
  );
}

export default Button;
