import { useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
import Button from "../ui/Button";
function LogoutButton() {
  const navigate = useNavigate();
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error);
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
