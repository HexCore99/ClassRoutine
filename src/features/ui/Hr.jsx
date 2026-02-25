function Hr({ value, size, mt = "mt-4", mb = "mb-4" }) {
  const base = `${mt} ${mb}`;

  if (size === "full")
    return (
      <div className={`${base} flex items-center`}>
        <span className="flex-1 border border-slate-100"></span>
        {value && <span className="px-2 uppercase">{value}</span>}
        <span className="flex-1 border border-slate-100"></span>
      </div>
    );
  else
    return (
      <div
        className={`${base} mx-auto flex w-[90%] items-center justify-center`}
      >
        <span className="flex-1 border border-slate-100"></span>
        {value && <span className="px-2 uppercase">{value}</span>}
        <span className="flex-1 border border-slate-100"></span>
      </div>
    );
}

export default Hr;
