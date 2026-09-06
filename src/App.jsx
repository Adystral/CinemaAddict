import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);

        const data = await response.json();

        setMovieList(data.results);
        console.log(data.results);
      } catch (error) {
        console.error(`Error fetching movies. ${error}`);
      }
    }

    fetchMovies();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home movieList={movieList} API_BASE_URL={API_BASE_URL} />}
        />

        <Route 
          path="/movie/:id" 
          element={<MovieDetails API_OPTIONS={API_OPTIONS} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
