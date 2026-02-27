// function Input({ label, value, onChange, id, style = "", required }) {
//   return (
//     <div className="flex w-full flex-col gap-2">
//       <label htmlFor={id} className="text-stone-500 uppercase">
//         {label}
//       </label>
//       <input
//         type="text"
//         value={value ?? ""}
//         id={id}
//         onChange={(e) => onChange?.(e.target.value)}
//         required={required}
//         className={` ${style} w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-700 focus:ring-1 focus:ring-amber-500 focus:outline-none`}
//       />
//     </div>
//   );
// }

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  className = "",
}) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-bold tracking-wide text-gray-700 uppercase">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-all duration-200 hover:bg-white focus:border-transparent focus:ring-2 focus:ring-green-500 focus:outline-none ${error ? "border-red-300 bg-red-50 focus:ring-red-500" : ""} ${disabled ? "cursor-not-allowed opacity-50" : ""} `}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
