import { SquarePen, Trash2 } from "lucide-react";
import Button from "../ui/Button";
import EditRoutine from "../Form/EditRoutine";
import { useSelector, useDispatch } from "react-redux";
import { openEdit, closeEdit } from "../Form/formSlice";

function SecInfo({ courseCode, courseName, room, facultyName, sec }) {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.form.isEditing);

  function handleEdit() {
    dispatch(openEdit());
  }
  return (
    <div className="flex w-full flex-1 items-center justify-between">
      <div className="font-dm-mono flex flex-col gap-1">
        <p className="text-xs text-stone-500 uppercase">
          {courseCode} - {courseName}
        </p>
        <h2 className="font-dm-sans font-semibold text-stone-700">
          {facultyName}
        </h2>
        <span className="flex items-center gap-4 uppercase">
          <p className="bg-stone-800 px-3 py-1 text-xs text-stone-50">
            Sec {sec}
          </p>
          <p className="text-xs text-stone-500">Room: {room}</p>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={handleEdit}>
          <SquarePen />
        </Button>

        <Button>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export default SecInfo;
