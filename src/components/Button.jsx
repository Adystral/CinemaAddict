import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className = "",
  onClick = () => {}
}) {
  return (
    <button
      className={twMerge(
        "text-slate-200 bg-slate-500 rounded hover:bg-slate-600 px-4 py-1 ml-2 hover:scale-105 active:scale-95 active:bg-slate-700 transition-all cursor-pointer font-mono",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}