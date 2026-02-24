function Time({ startTime, endTime }) {
  return (
    <div className="font-dm-mono">
      <p className="text-emerald-500 text-xs font-bold">{startTime}</p>
      <div className="flex gap-1.5 ">
        <span className="text-xs">↓</span>
        <span className="text-orange-500 text-xs">{endTime}</span>
      </div>
    </div>
  );
}

export default Time;
