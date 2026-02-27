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
    <div className="relative min-h-screen bg-gray-50 p-4 font-mono">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px),
                             repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 40px)`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col">
        {isEditing && <EditRoutine />}

        <div className="mb-4 flex justify-end">
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {scheduleDetails.map((item) => (
            <Details day={item.day} classes={item.classes} key={item.day} />
          ))}
        </div>

        <div className="mx-auto mt-6">
          <Button onClick={handleAddNew} className="bg-green-500">
            + Add New
          </Button>
        </div>
      </div>
    </div>
  );
}
export default RoutinePage;
