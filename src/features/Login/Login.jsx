import { Outlet } from "react-router-dom";
function Login() {
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
      <Outlet />
    </div>
  );

  // return <Credentials />;
}

export default Login;
