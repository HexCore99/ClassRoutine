import Credentials from "./Credentials";
import Verification from "./Verification";
import { useDispatch, useSelector } from "react-redux";
import { currState } from "./loginSlice";
const log = false;
function Login() {
  const currPage = useSelector(currState);
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50 p-4 font-mono">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px),
                           repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 40px)`,
          }}
        />
      </div>

      {currPage === "verification" ? <Verification /> : <Credentials />}
    </div>
  );

  // return <Credentials />;
}

export default Login;
