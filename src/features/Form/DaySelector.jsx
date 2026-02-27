import React from "react";
import Button from "../ui/Button";

function DaySelector({ selectedDay, onDayChange }) {
  const days = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

  return (
    <div className="mb-2">
      <div className="grid grid-cols-4 gap-2">
        {days.map((day) => (
          <Button
            key={day}
            type="button"
            onClick={() => onDayChange(day)}
            className={`${
              selectedDay === day
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } text-sm font-bold`}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default DaySelector;
