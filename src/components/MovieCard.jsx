export default function MovieCard({ setActiveMovie }) {
  return (
    <div
      className="movie-card flex flex-col justify-center items-center m-2 mt-3 p-5 pb-3 bg-slate-800 rounded-2xl"
      onClick={() => setActiveMovie(true)}
    >
      <img
        src="https://cdn.mos.cms.futurecdn.net/xFQ8L37EP3ARaoFg8cQYCD-768-80.jpg.webp"
        alt="interstellar"
        className="w-full h-70 rounded-2xl"
      />
      <h2 className="text-2xl mt-2">Interstellar</h2>
      <div>2014</div>
    </div>
  );
}
