export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 bg-linear-to-t from-slate-950 to-slate-900 font-mono">
      <div className="relative flex justify-center items-center mb-8">
      
        <div className="absolute w-20 h-20 bg-slate-500/20 rounded-full animate-ping"></div>

        <div className="w-16 h-16 border-4 border-slate-800 border-t-slate-300 rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(203,213,225,0.1)]"></div>
      </div>
    </div>
  );
}
