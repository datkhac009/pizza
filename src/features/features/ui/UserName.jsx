import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((s) => s.user.username);
  if (!username) return;
  return (
    <div>
      <p className="text-xl font-semibold">{username}</p>
    </div>
  );
}

export default UserName;
