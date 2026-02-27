import { useDebugValue, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "./Details";
import EditRoutine from "../Form/EditRoutine";

import {
  fetchRoutine,
  selectCourseError,
  selectCourseStatus,
  selectScheduleDetails,
} from "./courseSlice";
import { openAdd } from "../Form/formSlice";
import Button from "../ui/Button";
import LogoutButton from "../Login/LogoutButton";

function RoutinePage() {
  const isEditing = useSelector((state) => state.form.isEditing);
  const dispatch = useDispatch();
  const scheduleDetails = useSelector(selectScheduleDetails);
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);

  function handleAddNew() {
    dispatch(openAdd());
  }

  useEffect(() => {
    if (status === "idle") dispatch(fetchRoutine());
  }, [dispatch, status]);

  if (status === "loading" && scheduleDetails.length === 0) {
    return <p className="p-4">Loading routine.....</p>;
  }
  if (status === "failed") {
    return <p className="p-4 text-red-600">{error}</p>;
  }
  if (status === "loading" && scheduleDetails.length === 0) {
    return <p className="p-4">Loading routine.....</p>;
  }
  if (status === "failed") {
    return <p className="p-4 text-red-600">{error}</p>;
  }
  return (
    <div className="flex flex-col">
      {isEditing && <EditRoutine />}
      <div className="flex justify-end p-4">
        <LogoutButton />
      </div>
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
export default RoutinePage;
