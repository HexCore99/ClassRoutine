import { useSelector } from "react-redux";
import { selectEmailAddress } from "./loginSlice";
import { Navigate } from "react-router-dom";
import Verification from "./Verification";
function VerificationGuard() {
  const email = useSelector(selectEmailAddress);

  if (!email) return <Navigate to="/login" replace />;
  return <Verification />;
}

export default VerificationGuard;
