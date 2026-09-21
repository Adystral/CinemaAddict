import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_OPTIONS } from "../services/API_VARIABLES";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import MovieDetailsHero from "./MovieDetails/MovieDetailsHero";
import MovieDetailsCast from "./MovieDetails/MovieDetailsCast";
import MovieDetailsStats from "./MovieDetails/MovieDetailsStats";
import MovieDetailsGallery from "./MovieDetails/MovieDetailsGallery";
import MovieDetailsRecs from "./MovieDetails/MovieDetailsRecs";
import MovieDetailsTrailer from "./MovieDetails/MovieDetailsTrailer";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const navigate = useNavigate();

  const handleRecommendationClick = (movie) => {
    navigate(`/movie/${movie.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    async function getMovieDetails() {
      try {
        const endpoint = `${API_BASE_URL}/movie/${id}?append_to_response=credits,videos,images,recommendations`;
        const response = await fetch(endpoint, API_OPTIONS);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:  ", error);
      }
    }
    getMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <LoadingSpinner />;
  }


  // Trailer
  const trailer = movieDetails.videos?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube",
  );

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-200 font-mono pb-12">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0 h-[70vh] w-full">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
          alt="Backdrop"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>

      {/* Main Content */}
      
      {/* back to home */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-6">
          <Link
            to="/"
            className="text-slate-400 hover:text-white transition-colors text-lg"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* Details Card */}
        <MovieDetailsHero 
          movieDetails={movieDetails}
          trailer={trailer}
          setIsTrailerOpen={setIsTrailerOpen}
        />

        {/* CAST */}
        <MovieDetailsCast 
          movieDetails={movieDetails}
        />

        {/* Stats & Studios */}
        <MovieDetailsStats 
          movieDetails={movieDetails}
        />

        {/* Gallery with Arrows */}
        <MovieDetailsGallery 
          movieDetails={movieDetails}
        />

        {/* Recommendations Section */}
        <MovieDetailsRecs 
          movieDetails={movieDetails}
          handleRecommendationClick={handleRecommendationClick}
        />
      </div>

      {/* Full Screen YouTube Trailer Modal */}
      <MovieDetailsTrailer 
        trailer={trailer}
        isTrailerOpen={isTrailerOpen}
        setIsTrailerOpen={setIsTrailerOpen}
      />
    </div>
  );
}
