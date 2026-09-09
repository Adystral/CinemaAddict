import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MoviePreview from "../components/MoviePreview";
import Search from "../components/Search";
import { API_BASE_URL, API_OPTIONS } from "../services/API_VARIABLES";

export default function MovieSearch() {
  const [searchParams] = useSearchParams();
  const user_query = searchParams.get("q");

  const [activeMovie, setActiveMovie] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!user_query) {
      return;
    }

    async function fetchSearchResults() {
      try {
        const endpoint = `${API_BASE_URL}/search/movie?query=${user_query}`;

        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();

        const sortedMovies = data.results.sort((a, b) => {
          return b.popularity - a.popularity;
        });

        setSearchResults(sortedMovies);
        console.log(data);
      } catch (error) {
        console.error("Error fetching search page results: ", error);
      }
    }

    fetchSearchResults();
  }, [user_query]);

  console.log("bruh", searchResults);

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
        <Search />

        {/* Section Hearder */}
        <div className="w-full max-w-7xl px-4">
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-slate-500 pl-3">
            Search results for: "{user_query}"
          </h2>
          <div className="movie-container flex flex-wrap justify-center gap-6">
            {searchResults.map((movie) => {
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
