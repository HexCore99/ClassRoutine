function SecInfo({ courseCode, courseName, facultyName, sec }) {
  return (
    <div className="flex flex-col gap-1 font-dm-mono">
      <p className="text-stone-500 uppercase text-xs">
        {courseCode} - {courseName}
      </p>
      <h2 className="font-semibold text-stone-700 font-dm-sans">
        {facultyName}
      </h2>
      <span className="flex gap-4 uppercase items-center">
        <p className="bg-stone-800 text-stone-50 px-3 py-1 text-xs">
          Sec {sec}
        </p>
        <p
          className="text-stone-500 text-xs
        "
        >
          Morning Block
        </p>
      </span>
    </div>
  );
}

export default SecInfo;
