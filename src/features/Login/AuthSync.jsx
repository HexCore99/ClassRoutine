import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearAuthSession, setAuthSession } from "./loginSlice";
function AuthSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          dispatch(clearAuthSession());
          return;
        }

        const data = await res.json();
        dispatch(setAuthSession({ user: data.user }));
      } catch (err) {
        dispatch(clearAuthSession());
      }
    }

    checkAuth();
  }, [dispatch]);

  return null;
}

export default AuthSync;
