import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import InputItem from "../components/InputItem";
import MoviePreview from "../components/MoviePreview";

export default function Home({ movieList, API_BASE_URL }) {
  const [activeMovie, setActiveMovie] = useState(null); 

  return (
    <>
      {activeMovie && (
        <MoviePreview
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
          movieData={activeMovie} 
        />
      )}

      <div className="flex flex-col justify-start items-center min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 font-mono text-slate-300 pb-12">
        
        {/* Navigation Header */}
        <header className="w-full py-6 flex flex-col items-center border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md mb-8 z-10 sticky top-0">
          <Link to="/">
            <h1 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-slate-200 to-slate-500">
              CINEMADDICT
            </h1>
          </Link>
        </header>

        {/* Search Input */}
        <div className="input-container mb-12 w-full max-w-2xl px-4 text-center">
          <InputItem
            type="text"
            placeholder="Search movies (e.g. Interstellar)..." 
            inputClassName="w-full md:w-96 shadow-inner bg-slate-800/50"
            btnChildren="Search" 
            btnClassName="hover:bg-slate-700  transition"
          />
        </div>

        {/* Section Hearder */}
        <div className="w-full max-w-7xl px-4">
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-slate-500 pl-3">Trending Now</h2>
          <div className="movie-container flex flex-wrap justify-center gap-6">
            {movieList.map((movie) => {
              return (
                <MovieCard
                  setActiveMovie={setActiveMovie} 
                  key={movie.id} 
                  movieData={movie} 
                  API_BASE_URL={API_BASE_URL} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}