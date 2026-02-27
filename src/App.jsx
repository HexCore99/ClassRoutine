import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "./features/Login/Login";
import Credentials from "./features/Login/Credentials";

import Verification from "./features/Login/Verification";
import RoutinePage from "./features/course/RoutinePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <Login />,
    children: [
      { path: "/login", element: <Credentials /> },
      { path: "/verification", element: <Verification /> },
    ],
  },
  {
    path: "/routine",
    element: <RoutinePage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
