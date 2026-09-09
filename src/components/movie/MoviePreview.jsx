import { Link } from "react-router-dom";

export default function MoviePreview({ setActiveMovie, movieData }) {
  return (
    <div 
      className="fixed inset-0 z-100 bg-slate-950/80 backdrop-blur-md flex justify-center items-center text-slate-200 p-4 font-mono"
      // 1. Clicking the dark blurred background closes the modal
      onClick={() => setActiveMovie(null)} 
    >
      {/* 2. Added glass-panel & stopPropagation (so clicking the card itself doesn't close it) */}
      <div 
        className="glass-panel relative flex flex-col md:flex-row justify-start p-6 md:p-8 max-w-4xl w-full rounded-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        
        {/* 3. Fixed Close Button (added cursor-pointer, type="button", and z-50) */}
        <button 
          type="button"
          onClick={() => setActiveMovie(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer z-50 border border-slate-600/50 shadow-lg"
        >
          ✕
        </button>

        {/* Movie Poster */}
        <div className="w-full md:w-1/3 shrink-0 mb-6 md:mb-0 md:mr-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={`${movieData.title}`}
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Text Info (Styled like MovieDetails) */}
        <div className="flex flex-col justify-start w-full">
          <div className="movie-preview-details">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movieData.title}
              {movieData.release_date && (
                <span className="text-2xl text-slate-400 font-normal ml-3">
                  ({movieData.release_date.substring(0, 4)})
                </span>
              )}
            </h1>

            {/* Vertical Bar Stats Section */}
            <div className="flex flex-wrap items-center gap-4 mb-6 mt-4 text-sm">
              <div className="flex gap-4 border-l-2 border-slate-700 pl-4">
                <span className="text-slate-300 flex flex-col">
                  <span className="text-slate-500 text-xs font-semibold tracking-wider">RELEASE</span>
                  {movieData.release_date || "TBA"}
                </span>
                <span className="text-slate-300 flex flex-col">
                  <span className="text-slate-500 text-xs font-semibold tracking-wider">RATING</span>
                  {movieData.vote_average ? `${Math.round(movieData.vote_average * 10)}%` : "N/A"}
                </span>
                <span className="text-slate-300 flex flex-col">
                  <span className="text-slate-500 text-xs font-semibold tracking-wider">VOTES</span>
                  {movieData.vote_count || 0}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2 text-white">Overview</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base line-clamp-6">
                {movieData.overview || "No overview available for this movie."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-btns flex flex-wrap gap-4 mt-auto">
            <Link to={`/movie/${movieData.id}`} className="w-full md:w-auto">
              <button className="bg-slate-200 hover:bg-white text-slate-900 px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105 cursor-pointer w-full">
                More Details
              </button>
            </Link>
            
            {/* Directs users to the details page to watch the trailer */}
            <Link to={`/movie/${movieData.id}`} className="w-full md:w-auto">
              <button className="bg-slate-700/80 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-bold transition-all border border-slate-600 cursor-pointer w-full">
                Watch Trailer &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}