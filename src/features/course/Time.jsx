function Time({ startTime, endTime }) {
  return (
    <div className="font-dm-mono flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-0">
      <p className="text-sm font-bold text-emerald-500">{startTime}</p>
      <div className="flex gap-1.5">
        <span className="-rotate-90 text-xs md:rotate-0">↓</span>
        <span className="text-xs text-orange-500">{endTime}</span>
      </div>
    </div>
  );
}

export default Time;
