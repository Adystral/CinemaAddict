import dateConverter from "../../utils/dateConverter";
import hourConverter from "../../utils/hourConverter";

export default function MovieDetailsHero({ movieDetails, trailer, setIsTrailerOpen }) {
  // Director
  const director =
    movieDetails.credits?.crew?.find((c) => c.job === "Director")?.name ||
    "Unknown Director";

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 glass-panel rounded-3xl p-6 md:p-8">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={`${movieDetails.title}`}
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Text Info */}
        <div className="flex flex-col justify-start w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {`${movieDetails.title} (${dateConverter(movieDetails.release_date).year})`}
          </h1>
          <h3 className="text-xl text-slate-400 italic mb-4">
            {movieDetails.tagline}
          </h3>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
            {movieDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600/50"
              >
                {genre.name}
              </span>
            ))}

            <div className="flex gap-4 border-l border-slate-700 pl-4">
              <span className="text-slate-300 flex flex-col">
                <span className="text-slate-500 text-xs">RELEASE</span>
                {dateConverter(movieDetails.release_date).convertedDate}
              </span>
              <span className="text-slate-300 flex flex-col">
                <span className="text-slate-500 text-xs">RUNTIME</span>
                {hourConverter(movieDetails.runtime)}
              </span>
              <span className="text-slate-300 flex flex-col">
                <span className="text-slate-500 text-xs">RATING</span>
                {Math.round(movieDetails.vote_average * 10)}%
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Overview</h2>
            <p className="text-slate-300 leading-relaxed">
              {movieDetails.overview}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-1">Director</h2>
            <p className="text-slate-400">{director}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-auto">
            {trailer && (
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="bg-slate-200 hover:bg-white text-slate-900 px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105 cursor-pointer"
              >
                ▶ Play Trailer
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
