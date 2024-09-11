import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import "./MovieDetails.css";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data);

        const videosResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );
        const firstVideo = videosResponse.data.results[0];
        if (firstVideo && firstVideo.key) {
          setTrailerKey(firstVideo.key);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const playTrailer = () => setShowTrailer(true);
  const closeTrailer = () => setShowTrailer(false);

  const opts = {
    height: "500",
    width: "80%",
    playerVars: { autoplay: 1 },
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
      <article className="movie-detail-container">
        {showTrailer && trailerKey && (
            <section className="trailer-modal" aria-label="Trailer modal">
              <div className="trailer-container">
                <YouTube videoId={trailerKey} opts={opts} />
                <button
                    className="btn close-trailer"
                    onClick={closeTrailer}
                    aria-label="Close trailer"
                >
                  Close Trailer
                </button>
              </div>
            </section>
        )}
        <section className="movie-overview-content">
          <figure className="movie-detail-poster">
            <img
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
                className="poster-img"
                loading="lazy"
            />
          </figure>
          <section className="movie-detail-info">
            <h2 className="movie-title">{movie.title || "Loading..."}</h2>
            <h3 className="movie-subtitle">Overview</h3>
            <p className="movie-overview">
              {movie.overview || "No overview available"}
            </p>
            <p className="movie-release-date">
              Release Date: {formatDate(movie.release_date) || "No release date available"}
            </p>
            <button
                className="btn watch-trailer"
                onClick={playTrailer}
                aria-label="Watch trailer"
            >
              Watch Trailer
            </button>
          </section>
        </section>
      </article>
  );
};

export default MovieDetail;
