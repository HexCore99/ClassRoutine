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
    <div className="flex flex-col md:flex-row items-start md:items-center w-full space-y-4 md:space-y-0 md:space-x-10 py-4 px-4 border-b last:border-0 border-gray-100 ">
      <Time startTime={startTime} endTime={endTime} />
      <span className="w-px h-12 bg-gray-300 hidden md:block"></span>
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
