// import { Form } from "react";
import Button from "../ui/Button";
import Hr from "../ui/Hr";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { setId, selectClassBlockId, closeEdit } from "./formSlice";
import { selectScheduleDetails } from "../course/courseSlice";

function EditRoutine() {
  const dispatch = useDispatch();
  function handleCloseForm(e) {
    e.preventDefault();
    dispatch(closeEdit());
    dispatch(setId(null));
  }

  const classBlockId = useSelector(selectClassBlockId);
  const scheduleDetails = useSelector(selectScheduleDetails);
  const selectedClass = scheduleDetails
    .flatMap((dayItem) => dayItem.classes)
    .find((cls) => cls.id === classBlockId);
  console.log(selectedClass);

  const {
    startTime = "",
    endTime = "",
    courseName = "",
    courseCode = "",
    room = "",
    facultyName = "",
    sec = "",
  } = selectedClass || {};

  return (
    <div className="fixed inset-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/30 backdrop-blur-sm">
      <form className="h-[90%] w-2/4 overflow-scroll rounded-md bg-white p-5">
        <div className="flex items-center justify-between">
          <h1 className="w-fit text-2xl font-bold uppercase">Edit Class</h1>

          <Button
            style="border border-slate-300 px-1 py-1 text-xs"
            onClick={handleCloseForm}
          >
            ❌
          </Button>
        </div>

        <Hr value="time" />
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-5">
          <Input defaultValue={startTime} value="Start Time" />
          <Input defaultValue={endTime} value="End Time" />
        </div>

        <Hr value="Course" />
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-5">
          <Input defaultValue={courseCode} value="Course Code" />
          <Input defaultValue={courseName} value="Course Name" />
        </div>

        <Hr value="Details" />

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Input defaultValue={facultyName} value="Faculty Name" />
        </div>

        <div className="mt-5 flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-5">
          <Input defaultValue={sec} value="Section" />
          <Input defaultValue={room} value="Room Number" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 md:justify-end">
          <Button
            style=" border border-gray-300 bg-white text-gray-500"
            onClick={handleCloseForm}
          >
            Cancel
          </Button>
          <Button style="border-0 bg-slate-900 text-white">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default EditRoutine;
