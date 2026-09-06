export default function MovieCard({ setActiveMovie, movieData }) {
  return (
    <div
      className="movie-card flex flex-col justify-center items-center m-2 mt-3 p-5 pb-3 bg-slate-800 rounded-2xl w-56"
      onClick={() => setActiveMovie(movieData)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt={`${movieData.original_title}`}
        className="w-full h-72 object-cover rounded-2xl"
      />
      <div className="text-lg text-center mt-2 w-full truncate wrap-break-word">{movieData.original_title}</div>
      <div>{movieData.release_date}</div>
    </div>
  );
}