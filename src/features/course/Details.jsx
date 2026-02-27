import Day from "../day/Day";
import TimeAndFac from "./TimeAndFac";
import { SquarePen } from "lucide-react";

function Details({ day, classes }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col items-center rounded-xl border bg-white p-3 shadow-sm md:flex-row md:gap-5">
      <div className="mb-4 text-center text-3xl font-bold text-gray-800 md:mb-0 md:ml-5 md:-rotate-90 md:text-left">
        <Day day={day} />
      </div>

      <div className="flex w-full flex-col gap-3">
        {classes.map((cls) => (
          <TimeAndFac cls={cls} key={cls.id} />
        ))}
      </div>
    </div>
  );
}

export default Details;
