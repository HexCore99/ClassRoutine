import { useSelector } from "react-redux";
import Details from "./features/course/Details";
import EditRoutine from "./features/Form/EditRoutine";

const scheduleDetails = [
  {
    day: "SAT",
    classes: [
      {
        startTime: "08:30",
        endTime: "09:50",
        courseName: "Software Engineering",
        courseCode: "CSE 3421",
        room: "403",
        facultyName: "Syed Abu Ammar Muhammad Zarif",
        sec: "A",
      },
      {
        startTime: "09:51",
        endTime: "11:10",
        courseName: "Artificial Intelligence",
        courseCode: "CSE 3811",
        room: "403",
        facultyName: "Shihab Ahmed",
        sec: "B",
      },
      {
        startTime: "11:11",
        endTime: "13:40",
        courseName: "Software Engineering Laboratory",
        courseCode: "CSE 3422",
        room: "403",
        facultyName: "Saifullah Mahbub",
        sec: "B",
      },
    ],
  },
  {
    day: "SUN",
    classes: [
      {
        startTime: "08:30",
        endTime: "11:00",
        courseName: "Computer Networks Laboratory",
        courseCode: "CSE 3712",
        room: "403",
        facultyName: "Abdullah Ibne Masud Mahi",
        sec: "A",
      },
      {
        startTime: "13:51",
        endTime: "15:10",
        courseName: "Computer Networks",
        courseCode: "CSE 3711",
        room: "403",
        facultyName: "Mohammad Mamun Elahi",
        sec: "J",
      },
    ],
  },
  // {
  //   day: "MON",
  //   classes: [], // OFF
  // },
  {
    day: "TUE",
    classes: [
      {
        startTime: "08:30",
        endTime: "09:50",
        courseName: "Software Engineering",
        courseCode: "CSE 3421",
        room: "403",
        facultyName: "Syed Abu Ammar Muhammad Zarif",
        sec: "A",
      },
      {
        startTime: "09:51",
        endTime: "11:10",
        courseName: "Artificial Intelligence",
        courseCode: "CSE 3811",
        room: "403",
        facultyName: "Shihab Ahmed",
        sec: "B",
      },
    ],
  },
  {
    day: "WED",
    classes: [
      {
        startTime: "11:11",
        endTime: "13:40",
        courseName: "Artificial Intelligence Laboratory",
        courseCode: "CSE 3712",
        room: "403",
        facultyName: "Khandokar Md. Rahat Hossain",
        sec: "K",
      },
      {
        startTime: "13:51",
        endTime: "15:10",
        courseName: "Computer Networks",
        courseCode: "CSE 3711",
        room: "403",
        facultyName: "Mohammad Mamun Elahi",
        sec: "J",
      },
    ],
  },
  // {
  //   day: "THU",
  //   classes: [], // OFF
  // },
  // {
  //   day: "FRI",
  //   classes: [], //OFF
  // },
];

function App() {
  const isEditing = useSelector((state) => state.form.isEditing);
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
