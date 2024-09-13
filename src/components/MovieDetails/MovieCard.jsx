import { useNavigate } from "react-router-dom"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  const formatReleaseDate = (dateString) => {
      if (!dateString) return "Release date not available";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="movie-card" onClick={() => navigate(`../movies/${movie.id}`)}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-card-img" loading="lazy" />
      <div className="movie-card-body">
        <b>{movie.title}</b>
        <p>{formatReleaseDate(movie.release_date)}</p>
      </div>

    </div>
  );
};

export default MovieCard;
