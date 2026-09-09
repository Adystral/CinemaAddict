import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import { API_BASE_URL, API_OPTIONS } from "./services/API_VARIABLES";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MovieSearch from "./pages/MovieSearch";

function App() {
  const [movies, setMovies] = useState({
    trending: [],
    highestRated: [],
    nowPlaying: [],
    upcoming: [],
    action: [],
    comedy: [],
  });
  const [loading, setLoading] = useState(true);

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
        console.error(`Error fetching movie data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchAllMovieData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Home 
          movies={movies} 
          API_BASE_URL={API_BASE_URL}
          loading={loading} />
          } 
        />

        <Route path="/movie/:id" element={<MovieDetails  />} />

        <Route path="/search" element={<MovieSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
