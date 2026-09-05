import { Link } from "react-router-dom";
import Button from "./Button";

export default function MoviePreview({ setActiveMovie }) {
  return (
    <div className="preview-container fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center text-slate-200">
      <div className="details-container bg-slate-800 flex justify-start px-5 py-4 m-5 max-w-4xl w-[90%] rounded-2xl">
        <div className="movie-img-title flex flex-col min-w-fit">
          <img
            src="https://cdn.mos.cms.futurecdn.net/xFQ8L37EP3ARaoFg8cQYCD-768-80.jpg.webp"
            alt="interstellar"
            className="h-100 w-auto rounded-2xl"
          />
          <Button children="Watch Now" />
        </div>

        <div className="flex flex-col justify-between mx-4">
          <div className="movie-preview-details">
            <h1 className="text-4xl">Interstellar (2014)</h1>

            <h3>Adventure, Drama, Sci-fi</h3>
            <div className="my-4">⭐⭐⭐⭐⭐</div>

            <div>Released: 7 Nov 2014</div>

            <div className="">Length: 2hr 49min</div>

            <div className=" my-4">
              <p className="text-2xl">Overview</p>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Officia consectetur ipsum quo reprehenderit! Repudiandae aut,
                amet magnam numquam voluptatem suscipit cum debitis laudantium
                dolor minus totam quas quo dolorum nihil rerum quos harum neque
                iure.
              </p>
            </div>

            <div>Christopher Nolan</div>
          </div>

          <div className="action-btns flex flex-row justify-end gap-2">
            <Link to="/moviedetails">
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
