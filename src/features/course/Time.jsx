function Time({ startTime, endTime }) {
  return (
    <div className="font-dm-mono flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-0">
      <p className="text-emerald-500 text-sm font-bold">{startTime}</p>
      <div className="flex gap-1.5 ">
        <span className="text-xs md:rotate-0 -rotate-90">↓</span>
        <span className="text-orange-500 text-xs">{endTime}</span>
      </div>
    </div>
  );
}

export default Time;
