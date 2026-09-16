export default function MovieDetailsStats({movieDetails}) {
  return (
    <div className="mt-12 glass-panel rounded-3xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 border-b border-slate-700/50 pb-2 text-white">
        Cinephile Details
      </h2>

      {/* Financials Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs font-semibold tracking-wider">
            STATUS
          </span>
          <span className="text-slate-200">
            {movieDetails.status || "Unknown"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs font-semibold tracking-wider">
            BUDGET
          </span>
          <span className="text-slate-200">
            {movieDetails.budget
              ? `$${movieDetails.budget.toLocaleString()}`
              : "N/A"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500 text-xs font-semibold tracking-wider">
            REVENUE
          </span>
          <span className="text-emerald-400 font-semibold">
            {movieDetails.revenue
              ? `$${movieDetails.revenue.toLocaleString()}`
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Studios */}
      <h3 className="text-sm text-slate-500 mb-4 font-semibold tracking-wider">
        PRODUCTION STUDIOS
      </h3>
      <div className="flex flex-wrap gap-4 items-center">
        {movieDetails.production_companies?.map((studio) => (
          <div
            key={studio.id}
            className="bg-slate-200/90 px-4 py-3 rounded-xl flex items-center justify-center min-w-30 h-16 shadow-inner"
          >
            {studio.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${studio.logo_path}`}
                alt={studio.name}
                className="max-h-8 object-contain filter drop-shadow-sm"
              />
            ) : (
              <span className="text-slate-800 font-bold text-xs text-center">
                {studio.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
