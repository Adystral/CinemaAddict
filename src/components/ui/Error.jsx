import { AlertTriangle } from "lucide-react";

export default function ErrorState({ 
  error, 
  onRetry 
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] w-full text-slate-300 p-6">
      <div className="glass-panel flex flex-col items-center p-8 rounded-3xl max-w-md w-full border border-slate-700/50 shadow-2xl text-center bg-slate-800/40 backdrop-blur-md">
        
        <div className="bg-red-500/10 p-4 rounded-full mb-6 border border-red-500/20">
          <AlertTriangle className="w-10 h-10 text-red-400" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">Connection Error</h2>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
          {error}
        </p>

        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-slate-700/80 hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-bold transition-all border border-slate-600 shadow-lg cursor-pointer w-full"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}