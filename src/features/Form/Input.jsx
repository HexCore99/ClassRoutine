function Input({ label, value, onChange, id }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-stone-500 uppercase">
        {label}
      </label>
      <input
        type="text"
        value={value ?? ""}
        id={id}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-stone-700 focus:ring-1 focus:ring-amber-500 focus:outline-none"
      />
    </div>
  );
}

export default Input;
