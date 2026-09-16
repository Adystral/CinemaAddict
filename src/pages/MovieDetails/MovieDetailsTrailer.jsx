export default function MovieDetailsTrailer({trailer, isTrailerOpen, setIsTrailerOpen}) {
  return (
    isTrailerOpen &&
    trailer && (
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
    )
  );
}
