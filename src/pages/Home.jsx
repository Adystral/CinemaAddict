import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MoviePreview from "../components/MoviePreview";
import Search from "../components/Search";

export default function Home({ movieList, API_BASE_URL }) {
  const [activeMovie, setActiveMovie] = useState(null); 

  const scrollRef = useRef(null);

  // Auto Scroll
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
        <header className="w-full py-6 flex flex-col items-center border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-md mb-8 z-50 sticky top-0">
          <Link to="/">
            <h1 className="text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-slate-200 to-slate-500">
              CINEMADDICT
            </h1>
          </Link>
        </header>

        {/* Search Input */}
        <Search />

        {/* Section Hearder */}
        <div className="w-full max-w-7xl px-4 relative group">
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-slate-500 pl-3">Trending Now</h2>
          
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
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides ugly scrollbars
          >
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

          {/* Right Arrow */}
          <button 
            onClick={() => handleScroll("right")}
            className="hidden md:flex absolute right-0 top-[55%] -translate-y-1/2 z-40 glass-panel hover:bg-slate-700/80 text-white w-12 h-12 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
          >
            &#10095;
          </button>
        </div>
      </div>
    </>
  );
}