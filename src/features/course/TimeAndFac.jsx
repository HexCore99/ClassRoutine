import SecInfo from "./SecInfo";
import Time from "./Time";

function TimeAndFac({
  startTime,
  endTime,
  facultyName,
  courseCode,
  courseName,
  sec,
}) {
  return (
    <div className="flex items-center  w-xl space-x-10 py-2 px-4 ">
      <Time startTime={startTime} endTime={endTime} />
      <span className="w-px h-12 bg-gray-300"></span>
      <SecInfo
        facultyName={facultyName}
        courseCode={courseCode}
        courseName={courseName}
        sec={sec}
      />
    </div>
  );
}

export default TimeAndFac;
