// import { Form } from "react";
import Button from "../ui/Button";
import Hr from "../ui/Hr";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { setId, selectClassBlockId, closeEdit, selectMode } from "./formSlice";
import {
  fetchRoutine,
  selectScheduleDetails,
  updateRoutine,
  addNewCourse,
} from "../course/courseSlice";
import { useEffect, useState } from "react";
import DaySelector from "./DaySelector";

function EditRoutine() {
  const dispatch = useDispatch();

  const mode = useSelector(selectMode);
  const classBlockId = useSelector(selectClassBlockId);
  const scheduleDetails = useSelector(selectScheduleDetails);
  const selectedClass = scheduleDetails
    .flatMap((dayItem) => dayItem.classes)
    .find((cls) => cls.id === classBlockId);

  const {
    startTime = "",
    endTime = "",
    courseName = "",
    courseCode = "",
    room = "",
    facultyName = "",
    sec = "",
    day = "",
  } = selectedClass || {};

  const [start_time, set_start_time] = useState(startTime);
  const [end_time, set_end_time] = useState(endTime);
  const [course_name, set_course_name] = useState(courseName);
  const [course_code, set_course_code] = useState(courseCode);
  const [room_number, set_room_number] = useState(room);
  const [faculty_name, set_faculty_name] = useState(facultyName);
  const [sec_name, set_sec_name] = useState(sec);
  const [selected_day, set_selected_day] = useState(day);

  function handleCloseForm(e) {
    e.preventDefault();
    dispatch(closeEdit());
    dispatch(setId(null));
  }

  function checkTime(start, end) {
    // 8:10 is also valid. check later
    const time24h = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!time24h.test(start) || !time24h.test(end)) {
      return {
        ok: false,
        message: "Use 24-hour format HH:MM (example: 08:30).",
      };
    }

    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    if (toMinutes(start) >= toMinutes(end)) {
      return { ok: false, message: "End time must be later than start time." };
    }

    return { ok: true, message: "" };
  }

  async function handleSave(e) {
    e.preventDefault();

    console.log("SUBMIT FIRED");
    if (!selected_day) {
      alert("Please select a day.");
      return;
    }
    const timeStatus = checkTime(start_time.trim(), end_time.trim());
    if (!timeStatus.ok) {
      alert(timeStatus.message);
      return;
    }

    if (classBlockId == null && mode === "edit") {
      alert("No class selected.");
      return;
    }

    const payload = {
      id: classBlockId,
      start_time: start_time.trim(),
      end_time: end_time.trim(),
      course_name,
      course_code,
      faculty_name,
      sec: sec_name,
      room: room_number,
      day: selected_day,
    };

    try {
      if (mode === "edit") await dispatch(updateRoutine(payload)).unwrap();
      else await dispatch(addNewCourse(payload)).unwrap();

      dispatch(closeEdit());
      dispatch(setId(null));
      dispatch(fetchRoutine());
    } catch (err) {
      alert(err || `Failed to ${mode === "edit" ? "update" : "add"} class.`);
    }

    console.log("save payload", payload);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSave}
        className="flex max-h-[78dvh] w-[82vw] max-w-xs flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:max-h-[92dvh] sm:w-full sm:max-w-lg"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2 sm:px-6 sm:py-3">
          <h1 className="text-lg font-bold uppercase sm:text-2xl">
            {mode === "edit" ? "Edit Class" : "Add New Class"}
          </h1>

          <Button
            className="border border-slate-300 px-2 py-1 text-xs"
            onClick={handleCloseForm}
          >
            ✕
          </Button>
        </div>

        <div className="overflow-y-auto px-3 py-3 sm:px-6 sm:py-5">
          <Hr value="Day" />
          <DaySelector
            selectedDay={selected_day}
            onDayChange={set_selected_day}
          />

          <Hr value="time" />
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-5">
            <Input
              value={start_time}
              label="Start Time"
              id="start-time"
              onChange={set_start_time}
            />
            <Input
              value={end_time}
              label="End Time"
              id="end-time"
              onChange={set_end_time}
            />
          </div>

          <Hr value="Course" />
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-5">
            <Input
              value={course_code}
              label="Course Code"
              id="course-code"
              onChange={set_course_code}
            />
            <Input
              value={course_name}
              label="Course Name"
              id="course-name"
              onChange={set_course_name}
            />
          </div>

          <Hr value="Details" />

          <div className="flex flex-col items-center gap-2 md:flex-row">
            <Input
              value={faculty_name}
              label="Faculty Name"
              id="fac-name"
              onChange={set_faculty_name}
            />
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-5">
            <Input
              value={sec_name}
              label="Section"
              id="sec"
              onChange={set_sec_name}
            />
            <Input
              value={room_number}
              label="Room Number"
              id="room-number"
              onChange={set_room_number}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-2 md:justify-end">
            <Button
              className="border border-gray-300 bg-white text-gray-500"
              onClick={handleCloseForm}
            >
              Cancel
            </Button>
            <Button className="border-0 bg-slate-900 text-white" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditRoutine;
