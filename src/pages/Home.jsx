import { useState } from "react";
import { Link } from "react-router-dom";
import MoviePreview from "../components/movie/MoviePreview"; 
import Search from "../components/Search";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieRow from "../components/movie/MovieRow";

export default function Home({ movies, loading }) {
  const [activemovies, setActiveMovies] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {activemovies && (
        <MoviePreview
          activemovies={activemovies}
          setActiveMovies={setActiveMovies}
          moviesData={activemovies}
        />
      )}

      <div className="flex flex-col justify-start items-center min-h-screen bg-linear-to-b from-slate-950 via-slate-950/30 to-slate-950 font-mono text-slate-300 pb-12">
        {/* Navigation Header */}
        <header className="w-full py-6 flex flex-col items-center border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md mb-8 z-50 sticky top-0">
          <Link to="/">
            <h1 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-slate-200 to-slate-500">
              CINEMADDICT
            </h1>
          </Link>
        </header>

        {/* Search Input */}
        <Search />

        <MovieRow
          rowTitle="Trending Now!"
          movies={movies.trending}
          setActiveMovies={setActiveMovies}
        />

        <MovieRow
          rowTitle="Highest Rated"
          movies={movies.highestRated}
          setActiveMovies={setActiveMovies}
        />

        <MovieRow
          rowTitle="Upcoming Movies"
          movies={movies.upcoming}
          setActiveMovies={setActiveMovies}
        />

        <MovieRow
          rowTitle="In Theatres"
          movies={movies.nowPlaying}
          setActiveMovies={setActiveMovies}
        />

        <MovieRow
          rowTitle="Best of Action"
          movies={movies.action}
          setActiveMovies={setActiveMovies}
        />

        <MovieRow
          rowTitle="Best of Comedy"
          movies={movies.comedy}
          setActiveMovies={setActiveMovies}
        />
      </div>
    </>
  );
}
