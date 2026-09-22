import { Link } from "react-router-dom"

export default function Dropdown({isDropdownVisible,setIsDropdownVisible, searchQuery, searchResults}) {
  
  return (
    isDropdownVisible && searchQuery && searchResults.length > 0 && (
      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-b-2xl shadow-2xl overflow-hidden z-50 flex flex-col text-left">
        {searchResults.slice(0, 5).map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}

            onClick={() => setIsDropdownVisible(false)}
            className="flex items-center gap-4 p-3 hover:bg-slate-700/60 transition-colors border-b border-slate-700/50 last:border-none"
          >
            {/* Mini Poster */}
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
                className="w-10 h-14 object-cover rounded shadow"
              />
            ) : (
              <div className="w-10 h-14 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-400">
                N/A
              </div>
            )}

            {/* Title & Year */}
            <div className="flex flex-col">
              <span className="text-slate-200 font-semibold text-sm line-clamp-1">
                {movie.title}
              </span>
              <span className="text-slate-400 text-xs mt-1">
                {movie.release_date ? movie.release_date.substring(0, 4) : "Unknown"}
              </span>
            </div>
          </Link>
        ))}

        {/* See all results */}
        <Link
          to={`/search?q=${encodeURIComponent(searchQuery)}`}
          onClick={() => setIsDropdownVisible(false)}
          className="p-3 text-center text-sm text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors bg-slate-900/50"
        >
          See all results for "{searchQuery}" &rarr;
        </Link>
      </div>
    )
  )
}

 