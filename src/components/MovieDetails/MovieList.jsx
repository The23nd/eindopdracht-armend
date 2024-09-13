import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";
import "./MovieDetails.css";

const MovieList = ({ type, name }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, [type, apiKey]);

  return (
      <section className="movie-list-section">
        <h2 className="movie-list-title">{name}</h2>
        <div className="movie-list-container">
          {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
  );
};

export default MovieList;
