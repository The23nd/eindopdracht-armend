import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import { FacebookIcon, WhatsappIcon } from "react-share";
import "./MovieDetails.css";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { favoriteMovies, updateFavoriteMovies, isAuth } = useContext(AuthContext);
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);

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

        const savedRating = localStorage.getItem(`movieRating_${id}`);
        if (savedRating) {
          setUserRating(parseInt(savedRating, 10));
        }

        const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        if (favoriteMovies.includes(id)) {
          setIsFavorited(true);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    setIsFavorited(favoriteMovies.includes(id));
  }, [favoriteMovies, id]);

  const playTrailer = () => setShowTrailer(true);
  const closeTrailer = () => setShowTrailer(false);

  const toggleFavorite = () => {
    if (isFavorited) {
      const updatedFavorites = favoriteMovies.filter((movieId) => movieId !== id);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    } else {
      favoriteMovies.push(id);
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    }
    updateFavoriteMovies();
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    localStorage.setItem(`movieRating_${id}`, rating);
  };

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

  const movieUrl = `https://www.themoviedb.org/movie/${id}`;

  return (
      <article className="movie-detail-container">
        {showTrailer && trailerKey && (
            <section className="trailer-modal" aria-label="Trailer modal">
              <div className="trailer-container">
                <YouTube videoId={trailerKey} opts={opts} />
                <button className="btn close-trailer" onClick={closeTrailer} aria-label="Close trailer">
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
            <p className="movie-overview">{movie.overview || "No overview available"}</p>
            <p className="movie-release-date">Release Date: {formatDate(movie.release_date) || "No release date available"}</p>
            <button className="btn watch-trailer" onClick={playTrailer} aria-label="Watch trailer">
              Watch Trailer
            </button>
            {isAuth && (
                <>
                  <button className="btn favorite-btn" onClick={toggleFavorite} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}>
                    {isFavorited ? "Unfavorite" : "Favorite"}
                  </button>
                  <div className="star-rating">
                    <p className="rate-this-movie">Rate this movie:</p>
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                          <FaStar
                              key={index}
                              className="star"
                              size={24}
                              onMouseEnter={() => setHoverRating(ratingValue)}
                              onMouseLeave={() => setHoverRating(null)}
                              onClick={() => handleRating(ratingValue)}
                              color={ratingValue <= (hoverRating || userRating) ? "#ffc107" : "#e4e5e9"}
                          />
                      );
                    })}
                  </div>
                  {movieUrl &&
                      <div className="share-buttons">
                        <p className="share-this-movie">Share this movie:</p>
                        <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${movieUrl}`, "_blank")}>
                          <FacebookIcon size={32} round/>
                        </button>
                        <button onClick={() => window.open(`https://api.whatsapp.com/send?text=Check out this movie:${movieUrl}`, "_blank")}>
                          <WhatsappIcon size={32} round/>
                        </button>
                      </div>
                  }
                </>
            )}
          </section>
        </section>
      </article>
  );
};

export default MovieDetail;
