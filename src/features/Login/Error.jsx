function Error({ role, err }) {
  return (
    <div
      role={role}
      aria-live="polite"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1">{err}</p>
    </div>
  );
}

export default Error;
