export default function MovieDetailsCast({movieDetails}) {
  return (
    movieDetails.credits?.cast?.length > 0 && (
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-2">
          Top Cast
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide">
          {movieDetails.credits.cast.slice(0, 12).map((actor) => (
            <div
              key={actor.id}
              className="min-w-36 w-36 glass-panel rounded-xl overflow-hidden shrink-0 snap-start"
            >
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-44 object-cover"
                />
              ) : (
                <div className="w-full h-44 bg-slate-800 flex items-center justify-center text-slate-500 text-xs text-center p-2">
                  No Image Available
                </div>
              )}

              <div className="p-3 text-center">
                <p className="font-bold text-sm truncate text-slate-200">
                  {actor.name}
                </p>
                <p className="text-xs text-slate-400 truncate mt-1">
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
