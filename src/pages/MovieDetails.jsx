import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import dateConverter from "../utils/dateConverter";
import hourConverter from "../utils/hourConverter";

export default function MovieDetails({ API_OPTIONS }) {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const endpoint = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos`;

        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();

        setMovieDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    getMovieDetails();
    console.log(movieDetails);
  }, [id]);

  if (!movieDetails) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-900 bg-linear-to-t from-slate-950 to-slate-900 font-mono">
        <div className="relative flex justify-center items-center mb-8">
          {/* Ambient background pulse (Glass/Glow effect) */}
          <div className="absolute w-20 h-20 bg-slate-500/20 rounded-full animate-ping"></div>

          {/* Sleek primary spinner */}
          <div className="w-16 h-16 border-4 border-slate-800 border-t-slate-300 rounded-full animate-spin relative z-10 shadow-[0_0_15px_rgba(203,213,225,0.1)]"></div>
        </div>
      </div>
    );
  }

  // TODO: Add your useState variables here (e.g., movieDetails, cast)
  // TODO: Add your useEffect to fetch data using the 'id'

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-200 font-mono pb-12">
      {/* Background Hero Image with Gradient Fade */}
      <div className="absolute inset-0 z-0 h-[70vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt="Backdrop"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-slate-400 hover:text-white transition-colors text-lg"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* Glassmorphism Details Card */}
        <div className="flex flex-col md:flex-row gap-8 bg-slate-800/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-700/50 shadow-2xl">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={`${movieDetails.title}`}
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col justify-start w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {`${movieDetails.title} (${dateConverter(movieDetails.release_date).year})`}
            </h1>
            <h3 className="text-xl text-slate-400 italic mb-4">
              {`${movieDetails.tagline}`}
            </h3>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              {/* Genre */}
              {movieDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-slate-700/60 px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}

              <div>
                {/* Released */}
                <span className="text-slate-300">
                  {`📅 ${dateConverter(movieDetails.release_date).convertedDate}`}
                </span>
                <br />
                {/* Runtime */}
                <span className="text-slate-300">
                  {`⏱️ ${hourConverter(movieDetails.runtime)}`}
                </span>
                <br />
                {/* Review */}
                <span className="text-slate-300">
                  {`👍 ${movieDetails.vote_average * 10}% Liked this movie`}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-slate-300 movieDetailsData">
                {movieDetails.overview}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-1">Director</h2>
              <p className="text-slate-400">Director Name Placeholder</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-auto">
              <button className="bg-slate-200 hover:bg-white text-slate-900 px-6 py-2 rounded-lg font-bold transition-all shadow-lg">
                ▶ Play Trailer
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-bold transition-all">
                + Add to Watchlist
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-2">
            Top Cast
          </h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {/* Cast Card (You will map() over the crew array to generate these) */}
            <div className="min-w-37.5 w-37.5 bg-slate-800/50 rounded-xl overflow-hidden shrink-0 snap-start border border-slate-700/30">
              <img
                src="https://via.placeholder.com/150x225"
                alt="Actor"
                className="w-full h-44 object-cover"
              />
              <div className="p-3 text-center">
                <p className="font-bold text-sm truncate text-slate-200">
                  Actor Name
                </p>
                <p className="text-xs text-slate-400 truncate mt-1">
                  Character Name
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
