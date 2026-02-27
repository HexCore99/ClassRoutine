import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./features/Login/Login";
import Credentials from "./features/Login/Credentials";

import RoutinePage from "./features/course/RoutinePage";
import VerificationGuard from "./features/Login/VerificationGuard";
import ProtectedRoute from "./features/Login/ProtectedRoute";
import AuthSync from "./features/Login/AuthSync";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <Login />,
    children: [
      { path: "/login", element: <Credentials /> },
      { path: "/verification", element: <VerificationGuard /> },
    ],
  },
  {
    path: "/routine",
    element: (
      <ProtectedRoute>
        <RoutinePage />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <AuthSync />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
