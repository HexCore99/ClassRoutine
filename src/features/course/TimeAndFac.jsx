import SecInfo from "./SecInfo";
import Time from "./Time";

function TimeAndFac({
  startTime,
  endTime,
  facultyName,
  courseCode,
  courseName,
  room,
  sec,
}) {
  return (
    <div className="flex w-full flex-col items-start space-y-4 border-b border-gray-100 px-4 py-4 last:border-0 md:flex-row md:items-center md:space-y-0 md:space-x-10">
      <Time startTime={startTime} endTime={endTime} />
      <span className="hidden h-12 w-px bg-gray-300 md:block"></span>
      <SecInfo
        facultyName={facultyName}
        courseCode={courseCode}
        courseName={courseName}
        sec={sec}
        room={room}
      />
    </div>
  );
}

export default TimeAndFac;
