import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";

const MovieDetail = () => {
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setMovie(response.data);

        // Fetch movie videos to get the trailer key
        const videosResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );

        // Assuming the first video is the trailer
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

  const myStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  };

  const playTrailer = () => {
    setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  const opts = {
    height: "500",
    width: "80%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="container-fluid" style={myStyle}>
      {showTrailer && trailerKey && (
        <div className="youtube-container">
          <YouTube videoId={trailerKey} opts={opts} />
          <button className="btn btn-outline-light" onClick={closeTrailer}>
            Close Trailer
          </button>
        </div>
      )}
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded"
            loading="lazy"
          />
        </div>
        <div className="col-lg-8 col-md-6 text-light d-flex flex-column align-items-start justify-content-center">
          <h2>{movie.title}</h2>
          <p>Overview</p>
          <p>{movie.overview}</p>
          <p>Popularity: {movie.popularity}</p>
          <p>Release Date: {movie.release_date}</p>
          <button className="btn btn-outline-light" onClick={playTrailer}>
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
