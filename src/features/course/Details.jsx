import Day from "../day/Day";
import SecInfo from "./SecInfo";
import Time from "./Time";
import TimeAndFac from "./TimeAndFac";

function Details({ day, classes }) {
  console.log(classes);
  return (
    <div className="flex flex-col md:flex-row items-center  bg-white border shadow-sm rounded-xl p-3 w-full md:w-full md:gap-5 max-w-4xl mb-4">
      <div className="text-3xl font-bold text-gray-800 text-center md:text-left mb-4 md:mb-0 md:ml-10">
        <Day day={day} />
      </div>

      <div className="flex flex-col gap-3">
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
