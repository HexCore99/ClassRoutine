import { Navigate } from "react-router-dom";
import { selectAuthChecked, selectIsAuthenticated } from "./loginSlice";
import { useSelector } from "react-redux";
import { Children } from "react";
function ProtectedRoute({ children }) {
  const authChecked = useSelector(selectAuthChecked);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!authChecked) return <p className="p-4">Checking session......</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
