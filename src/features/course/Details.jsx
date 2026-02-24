import Day from "../day/Day";
import SecInfo from "./SecInfo";
import Time from "./Time";
import TimeAndFac from "./TimeAndFac";

function Details({ day, classes }) {
  console.log(classes);
  return (
    <div className="flex items-center  bg-white border shadow-sm rounded-xl p-3 w-fit max-w-4xl mb-4">
      <div className="text-2xl font-bold text-gray-800 ml-10">
        <Day day={day} />
      </div>
      <div className="flex flex-col gap-3 ml-12">
        {classes.map((cls) => (
          <TimeAndFac
            startTime={cls.startTime}
            endTime={cls.endTime}
            facultyName={cls.facultyName}
            courseCode={cls.courseCode}
            courseName={cls.courseName}
            sec={cls.sec}
          />
        ))}
      </div>
    </div>
  );
}

export default Details;
