import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MoviePreview from "../components/movie/MoviePreview";
import Search from "../components/Search";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import MovieRow from "../components/movie/MovieRow";
import { API_BASE_URL, API_OPTIONS } from "../services/API_VARIABLES";
import ErrorState from "../components/ui/Error";

export default function Home() {
  const [activeMovies, setActiveMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [movies, setMovies] = useState({
    trending: [],
    highestRated: [],
    nowPlaying: [],
    upcoming: [],
    action: [],
    comedy: [],
  });

  useEffect(() => {
    async function fetchAllMovieData() {
      try {
        const today = new Date().toISOString().split("T")[0];

        const endpoints = {
          trending: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`,
          highestRated: `${API_BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=10000`,
          upcoming: `${API_BASE_URL}/discover/movie?primary_release_date.gte=${today}&sort_by=popularity.desc`,
          nowPlaying: `${API_BASE_URL}/movie/now_playing`,
          action: `${API_BASE_URL}/discover/movie?with_genres=28`,
          comedy: `${API_BASE_URL}/discover/movie?with_genres=35`,
        };

        const [
          trendingRes,
          highestRatedRes,
          upcomingRes,
          nowPlayingRes,
          actionRes,
          comedyRes,
        ] = await Promise.all([
          fetch(endpoints.trending, API_OPTIONS),
          fetch(endpoints.highestRated, API_OPTIONS),
          fetch(endpoints.upcoming, API_OPTIONS),
          fetch(endpoints.nowPlaying, API_OPTIONS),
          fetch(endpoints.action, API_OPTIONS),
          fetch(endpoints.comedy, API_OPTIONS),
        ]);

        const responses = [
          trendingRes,
          highestRatedRes,
          upcomingRes,
          nowPlayingRes,
          actionRes,
          comedyRes,
        ];

        for (const res of responses) {
          if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status}`);
          }
        }

        const [
          trendingData,
          highestRatedData,
          upcomingData,
          nowPlayingData,
          actionData,
          comedyData,
        ] = await Promise.all([
          trendingRes.json(),
          highestRatedRes.json(),
          upcomingRes.json(),
          nowPlayingRes.json(),
          actionRes.json(),
          comedyRes.json(),
        ]);

        setMovies({
          trending: trendingData.results || [],
          highestRated: highestRatedData.results || [],
          upcoming: upcomingData.results || [],
          nowPlaying: nowPlayingData.results || [],
          action: actionData.results || [],
          comedy: comedyData.results || [],
        });
      } catch (error) {
        console.error(`Error fetching data: ${error}`);

        setError("Could not load movies. Try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllMovieData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      {activeMovies && (
        <MoviePreview
          activeMovies={activeMovies}
          setActiveMovie={setActiveMovies}
          movieData={activeMovies}
        />
      )}

      <div className="flex flex-col justify-start items-center min-h-screen bg-linear-to-b from-slate-950 via-slate-950/30 to-slate-950 font-mono text-slate-300 pb-12">
        {/* Navigation Header */}
        <header className="w-full py-6 flex flex-col items-center border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md mb-8 z-50 sticky top-0">
          <Link to="/">
            <h1 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-slate-200 to-slate-500">
              CinemaAddict
            </h1>
          </Link>
        </header>

        {/* Search Input */}
        <Search />

        <MovieRow
          rowTitle="Trending Now!"
          movies={movies.trending}
          setActiveMovie={setActiveMovies}
        />

        <MovieRow
          rowTitle="Highest Rated"
          movies={movies.highestRated}
          setActiveMovie={setActiveMovies}
        />

        <MovieRow
          rowTitle="Upcoming Movies"
          movies={movies.upcoming}
          setActiveMovie={setActiveMovies}
        />

        <MovieRow
          rowTitle="In Theatres"
          movies={movies.nowPlaying}
          setActiveMovie={setActiveMovies}
        />

        <MovieRow
          rowTitle="Best of Action"
          movies={movies.action}
          setActiveMovie={setActiveMovies}
        />

        <MovieRow
          rowTitle="Best of Comedy"
          movies={movies.comedy}
          setActiveMovie={setActiveMovies}
        />
      </div>
    </>
  );
}
