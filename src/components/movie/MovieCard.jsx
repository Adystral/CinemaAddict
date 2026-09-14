import dateConverter from "../../utils/dateConverter";

export default function MovieCard({ setActiveMovie, movieData }) {
  return (
    <div
      className="movie-card flex flex-col justify-center items-center m-2 mt-3 p-5 pb-3 bg-slate-900 hover:bg-slate-800/90 hover:cursor-pointer hover:scale-102 transition rounded-2xl w-56 shrink-0 snap-start"
      onClick={() => setActiveMovie(movieData)}
    >
      {movieData.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
          className="w-full h-72 object-cover rounded-2xl"
        />
      ) : (
        <div className="w-full h-72 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 text-sm">
          No poster
        </div>
      )}
      <div className="text-lg text-center mt-2 w-full truncate wrap-break-word">
        {movieData.title}
      </div>
      <div>{dateConverter(movieData.release_date).year}</div>
    </div>
  );
}
