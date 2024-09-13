import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const { query } = useParams();

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      setResults([]);
      setNoResults(true);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        setNoResults(false);

        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`
        );

        if (response.data.results.length === 0) {
          setNoResults(true);
        } else {
          setResults(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("An error occurred while fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
      <section className="search-results">
        <h2 className="search-results__header">Search results for: {query}</h2>

        {loading && <p className="search-results__status">Loading...</p>}

        {error && <p className="search-results__error">{error}</p>}

        {noResults && !loading && !error && (
            <p className="search-results__no-results">The name you are searching for doesnt exist.</p>
        )}

        {results.length > 0 && (
            <ul className="search-results__list">
              {results
                  .filter(
                      (result) =>
                          result.poster_path &&
                          (result.title || result.name) &&
                          result.overview &&
                          (result.release_date || result.first_air_date)
                  )
                  .map((result) => (
                      <li
                          key={result.id}
                          className="search-results__item"
                      >
                        <article>
                          <div className="search-results__image">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                                alt={result.title || result.name}
                                loading="lazy"
                                className="search-results__img"
                            />
                          </div>
                          <div className="search-results__details">
                            <h3 className="search-results__title">{result.title || result.name}</h3>
                            <p className="search-results__overview">{result.overview}</p>
                            <Link
                                to={result.media_type === "movie" ? `/movies/${result.id}` : `/series/${result.id}`}
                                className="search-results__link"
                            >
                              Read More
                            </Link>
                          </div>
                        </article>
                      </li>
                  ))}
            </ul>
        )}
      </section>
  );
};

export default SearchResults;
