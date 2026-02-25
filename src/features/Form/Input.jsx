function Input({ value, defaultValue }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor="input" className="text-stone-500 uppercase">
        {value}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        id="input"
        className="bg-white-100 rounded-md border border-stone-300 px-3 py-2 text-stone-700 focus:ring-1 focus:ring-amber-500 focus:outline-none"
      />
    </div>
  );
}

export default Input;
