import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "./features/course/Details";
import EditRoutine from "./features/Form/EditRoutine";
import {
  fetchRoutine,
  selectCourseError,
  selectCourseStatus,
  selectScheduleDetails,
} from "./features/course/courseSlice";

function App() {
  const isEditing = useSelector((state) => state.form.isEditing);
  const dispatch = useDispatch();
  const scheduleDetails = useSelector(selectScheduleDetails);
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);

  useEffect(() => {
    if (status === "idle") dispatch(fetchRoutine());
  }, [dispatch, status]);

  if (status === "loading") return <p className="p-4"> Loading routine.....</p>;
  if (status === "error") return <p className="p-4 text-red-600">{error}</p>;

  return (
    <>
      {isEditing && <EditRoutine />}
      <div className="grid max-h-dvh max-w-dvw grid-cols-1 gap-6 overflow-scroll border p-4 md:grid-cols-2">
        {scheduleDetails.map((item) => (
          <Details day={item.day} classes={item.classes} key={item.day} />
        ))}
      </div>
    </>
  );
}

export default App;
