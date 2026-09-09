import { Link } from "react-router-dom";
// not using btn components for now, will make another component for the actions btn later

export default function MoviePreview({ setActiveMovie, movieData }) {
  return (
    <div className="preview-container fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center text-slate-200 p-4">
      
      <div className="details-container relative bg-slate-800/40 backdrop-blur-md flex flex-col md:flex-row justify-start p-6 md:p-8 max-w-4xl w-full rounded-3xl border border-slate-700/50 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button 
          onClick={() => setActiveMovie(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-slate-800/60 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="movie-img-title w-full md:w-1/3 shrink-0 mb-6 md:mb-0 md:mr-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} //[cite: 12]
            alt={`${movieData.title}`} //[cite: 12]
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-start w-full">
          <div className="movie-preview-details">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{movieData.title}</h1>

            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
              <span className="bg-slate-700/60 px-3 py-1 rounded-full">Adventure</span>
              <span className="bg-slate-700/60 px-3 py-1 rounded-full">Sci-Fi</span>
              <span className="text-slate-300 font-semibold">{`👍 ${Math.round(movieData.vote_average * 10)}% | ${movieData.vote_count} votes`}</span>
            </div>

            <div className="text-slate-400 text-sm mb-6">
              Released: {movieData.release_date} 
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>

              <p className="text-slate-300 leading-relaxed text-sm md:text-base line-clamp-7">
                {movieData.overview} 
              </p>
            </div>
          </div>

          <div className="action-btns flex flex-wrap gap-4 mt-auto">
            <Link to={`/movie/${movieData.id}`}>
              <button className="bg-slate-200 hover:bg-white text-slate-900 px-5 py-2 rounded-lg font-bold transition-all shadow-lg w-full md:w-auto text-sm cursor-pointer">
                More Details
              </button>
            </Link>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-lg font-bold transition-all w-full md:w-auto text-sm cursor-pointer">
              View Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}