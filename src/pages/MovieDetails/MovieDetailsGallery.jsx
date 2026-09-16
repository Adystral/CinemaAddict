import { useRef } from "react";

export default function MovieDetailsGallery({movieDetails}) {
  const galleryRef = useRef(null);
  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    movieDetails.images?.backdrops?.length > 0 && 
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
  
  )
}