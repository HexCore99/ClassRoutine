import { SquarePen, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import EditRoutine from "../Form/EditRoutine";
import { useDispatch } from "react-redux";
import { openEdit } from "../Form/formSlice";
import { setId } from "../Form/formSlice";
import { removeCourse } from "./courseSlice";
function SecInfo({ cls }) {
  const dispatch = useDispatch();

  function handleEdit() {
    dispatch(openEdit());
    dispatch(setId(cls.id));
  }

  function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${cls.courseName}?`,
    );

    if (confirmDelete) {
      dispatch(removeCourse({ id: cls.id }));
    }
  }
  return (
    <div className="flex w-full flex-1 items-center justify-between">
      <div className="font-dm-mono flex flex-col gap-1">
        <p className="text-xs text-stone-500 uppercase">
          {cls.courseCode} - {cls.courseName}
        </p>
        <h2 className="font-dm-sans font-semibold text-stone-700">
          {cls.facultyName}
        </h2>
        <span className="flex items-center gap-4 uppercase">
          <p className="bg-stone-800 px-3 py-1 text-xs text-stone-50">
            Sec {cls.sec}
          </p>
          <p className="text-xs text-stone-500">Room: {cls.room}</p>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={handleEdit}>
          <SquarePen />
        </Button>

        <Button onClick={handleDelete}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export default SecInfo;
