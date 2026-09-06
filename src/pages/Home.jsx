import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import InputItem from "../components/InputItem";
import MoviePreview from "../components/MoviePreview";
MoviePreview;

export default function Home({ movieList, API_BASE_URL }) {
  const [activeMovie, setActiveMovie] = useState(null);

  return (
    <>
      {activeMovie &&
      
        <MoviePreview
          activeMovie={activeMovie}
          setActiveMovie={setActiveMovie}
          movieData={activeMovie}
        />
      }

      <div className="flex flex-col justify-start items-center min-h-screen bg-slate-900 font-mono text-slate-300">
        <Link to="/">
          <h1 className="text-3xl font-bold m-4">Cinemaddict</h1>
        </Link>

        <div className="input-container mb-4">
          <InputItem
            type="text"
            placeholder="Interstellar..."
            inputClassName="search-input"
            btnChildren="Search"
            btnClassName="search-btn"
          />
        </div>

        <h1 className="p-4 mx-5">Popular Movies</h1>
        <div className="movie-container flex flex-col flex-wrap p-2">
          <div className="flex flex-row flex-wrap justify-center">
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
