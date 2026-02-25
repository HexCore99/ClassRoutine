function Button({ children, style, onClick }) {
  return (
    <button
      className={`${style} rounded-md px-3 py-2 outline-0 transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md active:scale-95 md:px-4`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
