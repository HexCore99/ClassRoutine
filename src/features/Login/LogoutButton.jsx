import { useNavigate } from "react-router-dom";
import { clearAuthSession } from "./loginSlice";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch(clearAuthSession());

    navigate("/login", { replace: true });
  }
  return (
    <Button
      onClick={handleLogout}
      className="border border-red-300 bg-white text-red-600"
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
