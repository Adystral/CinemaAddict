import { useEffect, useRef } from "react";
import { API_BASE_URL } from "../../services/API_VARIABLES";
import MovieCard from "./MovieCard";

export default function MovieRow({
  movies,
  setActiveMovie,
  rowTitle="",
}) {

  const scrollRef = useRef(null);
  useEffect(() => {
    const autoScrollTimer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // snap back to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // scroll right by one card width
          scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
        }
      }
    }, 4000);

  
    return () => clearInterval(autoScrollTimer);
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };


  return (
    <div className="w-full max-w-7xl px-4 relative group">
      <h2 className="text-2xl font-semibold mb-3 border-l-4 border-slate-500 pl-3">
        {rowTitle}
      </h2>

      {/* Left Arrow (Hidden on mobile, appears on desktop hover) */}
      <button
        onClick={() => handleScroll("left")}
        className="hidden md:flex absolute left-0 top-[55%] -translate-y-1/2 z-40 glass-panel hover:bg-slate-700/80 text-white w-12 h-12 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        &#10094;
      </button>

      {/* The Scroll Container (Attached to our useRef) */}
      <div
        ref={scrollRef}
        className="movie-container flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hides ugly scrollbars
      >
        {movies.map((movie) => {
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

      {/* Right Arrow */}
      <button
        onClick={() => handleScroll("right")}
        className="hidden md:flex absolute right-0 top-[55%] -translate-y-1/2 z-40 glass-panel hover:bg-slate-700/80 text-white w-12 h-12 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
      >
        &#10095;
      </button>
    </div>
  );
}
