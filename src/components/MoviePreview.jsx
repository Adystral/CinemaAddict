import { Link } from "react-router-dom";
import Button from "./Button";

export default function MoviePreview({ setActiveMovie, movieData }) {
  

  return (
    <div className="preview-container fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center text-slate-200">
      <div className="details-container bg-slate-800 flex justify-start px-5 py-4 m-5 max-w-4xl w-[90%] rounded-2xl">
        <div className="movie-img-title flex flex-col min-w-fit">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
            alt={`${movieData.original_title}`}
            className="h-100 w-auto rounded-2xl"
          />
          <Button children="Watch Now" />
        </div>

        <div className="flex flex-col justify-between mx-4">
          <div className="movie-preview-details">
            <h1 className="text-4xl">{`${movieData.original_title}`}</h1>

            <div className="my-2">Adventure, Drama, Sci-fi</div>
            <div className="my-4 text-2xl">{`👍 ${movieData.vote_average * 10}%`}</div>

            <div>Release: {movieData.release_date}</div>

            <div className=" my-4">
              <p className="text-2xl my-2 mt-5">Overview</p>
              <p>{movieData.overview}</p>
            </div>

          </div>

          <div className="action-btns flex flex-row justify-end gap-2">
            <Link to={`/movie/${movieData.id}`}>
              <Button children="More Details" />
            </Link>
            <Button children="View Trailer" />
            <Button
              children="<- Go Back"
              onClick={() => {
                setActiveMovie(null);
                console.log("null");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
