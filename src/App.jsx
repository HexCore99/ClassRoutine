import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "./features/course/Details";
import EditRoutine from "./features/Form/EditRoutine";
import Credentials from "./features/Login/Credentials";
import Verification from "./features/Login/Verification";
import {
  selectEmailAddress,
  selectIsAuthenticated,
} from "./features/Login/loginSlice";
import {
  fetchRoutine,
  selectCourseError,
  selectCourseStatus,
  selectScheduleDetails,
} from "./features/course/courseSlice";
import { openAdd } from "./features/Form/formSlice";
import Login from "./features/Login/Login";
import Button from "./features/ui/Button";

function App() {
  const isEditing = useSelector((state) => state.form.isEditing);
  const dispatch = useDispatch();
  const scheduleDetails = useSelector(selectScheduleDetails);
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);
  const isLoggedIn = true;

  function handleAddNew() {
    dispatch(openAdd());
  }

  useEffect(() => {
    if (status === "idle") dispatch(fetchRoutine());
  }, [dispatch, status]);

  if (status === "loading" && scheduleDetails.length === 0)
    return <p className="p-4"> Loading routine.....</p>;
  if (status === "failed") return <p className="p-4 text-red-600">{error}</p>;

  if (!isLoggedIn) return <Login />;

  return (
    <div className="flex flex-col">
      {isEditing && <EditRoutine />}
      <div className="grid max-h-dvh max-w-dvw grid-cols-1 gap-6 overflow-scroll p-4 md:grid-cols-2">
        {scheduleDetails.map((item) => (
          <Details day={item.day} classes={item.classes} key={item.day} />
        ))}
      </div>
      <div className="m-auto">
        <Button onClick={handleAddNew} className="bg-green-500">
          + Add New
        </Button>
      </div>
    </div>
  );
}

export default App;
