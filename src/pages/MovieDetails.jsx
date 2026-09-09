import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import dateConverter from "../utils/dateConverter";
import hourConverter from "../utils/hourConverter";
import { API_BASE_URL, API_OPTIONS } from "../services/API_VARIABLES";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieRow from "../components/movie/MovieRow";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const navigate = useNavigate();
  const galleryRef = useRef(null);
  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      // Images are wider, so we scroll by 500px instead of 400px
      const scrollAmount = direction === "left" ? -500 : 500;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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

  // Director
  const director =
    movieDetails.credits?.crew?.find((c) => c.job === "Director")?.name ||
    "Unknown Director";

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

      {/* Main Content — single container wraps every section so spacing/margins stay consistent */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        <div className="mb-6">
          <Link
            to="/"
            className="text-slate-400 hover:text-white transition-colors text-lg"
          >
            &larr; Back to Home
          </Link>
        </div>

        {/* Glassmorphism Details Card */}
        <div className="flex flex-col md:flex-row gap-8 glass-panel rounded-3xl p-6 md:p-8">
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
              {movieDetails.tagline}
            </h3>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              {movieDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-slate-700/60 px-3 py-1 rounded-full border border-slate-600/50"
                >
                  {genre.name}
                </span>
              ))}

              <div className="flex gap-4 border-l border-slate-700 pl-4">
                <span className="text-slate-300 flex flex-col">
                  <span className="text-slate-500 text-xs">RELEASE</span>
                  {dateConverter(movieDetails.release_date).convertedDate}
                </span>
                <span className="text-slate-300 flex flex-col">
                  <span className="text-slate-500 text-xs">RUNTIME</span>
                  {hourConverter(movieDetails.runtime)}
                </span>
                <span className="text-slate-300 flex flex-col">
                  <span className="text-slate-500 text-xs">RATING</span>
                  {Math.round(movieDetails.vote_average * 10)}%
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-slate-300 leading-relaxed">
                {movieDetails.overview}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-1">Director</h2>
              <p className="text-slate-400">{director}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-auto">
              {trailer && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="bg-slate-200 hover:bg-white text-slate-900 px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:scale-105 cursor-pointer"
                >
                  ▶ Play Trailer
                </button>
              )}
              {/* <button className="bg-slate-700/80 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-bold transition-all border border-slate-600 cursor-pointer">
                + Add to Watchlist
              </button> */}
              {/* WILL ADD THIS FEATURE LATER :D made by Aditya Raj :>> */}
            </div>
          </div>
        </div>

        {/* CAST */}
        {movieDetails.credits?.cast?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-2">
              Top Cast
            </h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide">
              {movieDetails.credits.cast.slice(0, 12).map((actor) => (
                <div
                  key={actor.id}
                  className="min-w-36 w-36 glass-panel rounded-xl overflow-hidden shrink-0 snap-start"
                >
                  {actor.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      className="w-full h-44 object-cover"
                    />
                  ) : (
                    <div className="w-full h-44 bg-slate-800 flex items-center justify-center text-slate-500 text-xs text-center p-2">
                      No Image Available
                    </div>
                  )}

                  <div className="p-3 text-center">
                    <p className="font-bold text-sm truncate text-slate-200">
                      {actor.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate mt-1">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deep Dive Stats & Studios */}
        <div className="mt-12 glass-panel rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-700/50 pb-2 text-white">
            Cinephile Details
          </h2>

          {/* Financials Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-semibold tracking-wider">
                STATUS
              </span>
              <span className="text-slate-200">
                {movieDetails.status || "Unknown"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-semibold tracking-wider">
                BUDGET
              </span>
              <span className="text-slate-200">
                {movieDetails.budget
                  ? `$${movieDetails.budget.toLocaleString()}`
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-500 text-xs font-semibold tracking-wider">
                REVENUE
              </span>
              <span className="text-emerald-400 font-semibold">
                {movieDetails.revenue
                  ? `$${movieDetails.revenue.toLocaleString()}`
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Studios */}
          <h3 className="text-sm text-slate-500 mb-4 font-semibold tracking-wider">
            PRODUCTION STUDIOS
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            {movieDetails.production_companies?.map((studio) => (
              <div
                key={studio.id}
                className="bg-slate-200/90 px-4 py-3 rounded-xl flex items-center justify-center min-w-30 h-16 shadow-inner"
              >
                {studio.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${studio.logo_path}`}
                    alt={studio.name}
                    className="max-h-8 object-contain filter drop-shadow-sm"
                  />
                ) : (
                  <span className="text-slate-800 font-bold text-xs text-center">
                    {studio.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cinematic Gallery with Arrows */}
        {movieDetails.images?.backdrops?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-2">
              Gallery
            </h2>

            {/* The relative group wrapper for the arrows */}
            <div className="relative group w-full">
              {/* Left Arrow */}
              <button
                onClick={() => scrollGallery("left")}
                className="hidden md:flex absolute left-2 top-[45%] -translate-y-1/2 z-40 glass-panel hover:bg-slate-700/80 text-white w-12 h-12 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-2xl"
              >
                &#10094;
              </button>

              {/* Scroll Container attached to galleryRef */}
              <div
                ref={galleryRef}
                className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {movieDetails.images.backdrops
                  .slice(0, 8)
                  .map((image, index) => (
                    <div
                      key={index}
                      className="min-w-75 md:min-w-112.5 aspect-video glass-panel rounded-2xl overflow-hidden shrink-0 snap-start shadow-xl cursor-pointer"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                        alt="Movie Scene"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollGallery("right")}
                className="hidden md:flex absolute right-2 top-[45%] -translate-y-1/2 z-40 glass-panel hover:bg-slate-700/80 text-white w-12 h-12 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-2xl"
              >
                &#10095;
              </button>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {movieDetails.recommendations?.results?.length > 0 && (
          <div className="mt-12 mb-8 -mx-4 md:mx-0">
            <MovieRow
              rowTitle="More Like This"
              movies={movieDetails.recommendations.results}
              setActiveMovie={handleRecommendationClick}
            />
          </div>
        )}
      </div>

      {/* Full Screen YouTube Trailer Modal */}
      {isTrailerOpen && trailer && (
        <div className="fixed inset-0 z-50 bg-black/95 flex justify-center items-center p-4 backdrop-blur-md">
          <div className="w-full max-w-5xl relative">
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute -top-12 right-0 text-white text-xl font-bold hover:text-slate-400 cursor-pointer"
            >
              ✕
            </button>
            <div className="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
