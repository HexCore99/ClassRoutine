import Details from "./features/course/Details";

const scheduleDetails = [
  {
    day: "SAT",
    classes: [
      {
        startTime: "08:30",
        endTime: "09:50",
        courseName: "Software Engineering",
        courseCode: "CSE 3421",
        facultyName: "Syed Abu Ammar Muhammad Zarif",
        sec: "A",
      },
      {
        startTime: "09:51",
        endTime: "11:10",
        courseName: "Artificial Intelligence",
        courseCode: "CSE 3811",
        facultyName: "Shihab Ahmed",
        sec: "B",
      },
      {
        startTime: "11:11",
        endTime: "13:40",
        courseName: "Software Engineering Laboratory",
        courseCode: "CSE 3422",
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
        facultyName: "Abdullah Ibne Masud Mahi",
        sec: "A",
      },
      {
        startTime: "13:51",
        endTime: "15:10",
        courseName: "Computer Networks",
        courseCode: "CSE 3711",
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
        facultyName: "Syed Abu Ammar Muhammad Zarif",
        sec: "A",
      },
      {
        startTime: "09:51",
        endTime: "11:10",
        courseName: "Artificial Intelligence",
        courseCode: "CSE 3811",
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
        facultyName: "Khandokar Md. Rahat Hossain",
        sec: "K",
      },
      {
        startTime: "13:51",
        endTime: "15:10",
        courseName: "Computer Networks",
        courseCode: "CSE 3711",
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
  return (
    <div className="flex flex-col items-center p-4 border max-w-dvw max-h-dvh overflow-scroll">
      {scheduleDetails.map((item) => (
        <Details day={item.day} classes={item.classes} key={item.day} />
      ))}
    </div>
  );
}

export default App;
