import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container">
      <h2 className="text-center my-5">Search Results for {query}</h2>

      {results
        .filter(
          (result) =>
            result.poster_path &&
            result.title &&
            result.overview &&
            result.release_date
        )
        .map((result) => (
          <div
            key={result.id}
            className="row my-5 text-light shadow rounded p-3"
            style={{ backgroundColor: "#032541" }}
          >
            <div className="col-lg-4 text-center col-md-6 row-img">
              <img
                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                alt={result.title}
                className="img-fluid rounded"
                loading="lazy"
                width={200}
              />
            </div>
            <div className="col-lg-8 col-md-6 d-flex flex-column align-items-start justify-content-center">
              <p>{result.title}</p>
              {/* <p>{formatReleaseDate(result.release_date)}</p> */}
              <p>{result.overview}</p>
              <Link to={`/movie/${result.id}`}>Read More</Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
