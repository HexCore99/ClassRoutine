import { useDispatch } from "react-redux";
import { clearAuthSession, setAuthSession } from "./loginSlice";
import { useEffect } from "react";
import supabase from "../../lib/supabase";
function AuthSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (error || !data.session) {
        dispatch(clearAuthSession());
        return;
      }
      dispatch(setAuthSession(data.session));
      return;
    }

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) dispatch(setAuthSession(session));
        else dispatch(clearAuthSession());
      },
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);
  return null;
}

export default AuthSync;
