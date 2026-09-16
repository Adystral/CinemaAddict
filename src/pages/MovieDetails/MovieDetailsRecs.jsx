import MovieRow from "../../components/movie/MovieRow";

export default function MovieDetailsRecs({movieDetails, handleRecommendationClick}) {
  return (
    movieDetails.recommendations?.results?.length > 0 && (
      <div className="mt-12 mb-8 -mx-4 md:mx-0">
        <MovieRow
          rowTitle="More Like This"
          movies={movieDetails.recommendations.results}
          setActiveMovie={handleRecommendationClick}
        />
      </div>
    )
  );
}
