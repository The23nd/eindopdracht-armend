import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import axios from "axios";
import SerieCard from "../../components/SerieDetails/SerieCard.jsx";
import MovieCard from "../../components/MovieDetails/MovieCard.jsx";
import "./MyAccount.css"

const MyAccount = () => {
    const { login, user, favoriteMovies, favoriteSeries } = useContext(AuthContext);
    const [favoriteMoviesData, setFavoriteMoviesData] = useState([]);
    const [favoriteSeriesData, setFavoriteSeriesData] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const favoriteMoviesDetail = await Promise.all(
                    favoriteMovies.map(id =>
                        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
                    )
                );
                setFavoriteMoviesData(favoriteMoviesDetail.map(response => response.data));
            } catch (error) {
                console.error("Error fetching movies data:", error);
            }
        };

        fetchFavoriteMovies();
    }, [favoriteMovies, apiKey]);

    useEffect(() => {
        const fetchFavoriteSeries = async () => {
            if (favoriteSeries.length > 0) {
                try {
                    const favoriteSeriesDetail = await Promise.all(
                        favoriteSeries.map(id =>
                            axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
                        )
                    );
                    setFavoriteSeriesData(favoriteSeriesDetail.map(response => response.data));
                } catch (error) {
                    console.error("Error fetching series data:", error);
                }
            }
        };

        fetchFavoriteSeries();
    }, [favoriteSeries, apiKey]);

    return (
        <div className="container">
            <h1>My Account</h1>
            {login ? (
                <>
                    <p>Welcome {user?.username}</p>
                    <p>username: {user?.email}</p>
                    <section className="movie-list-section">
                        <h2 className="movie-list-title">Favorite Movies</h2>
                        <div className="movie-list-container">
                            {favoriteMoviesData.length > 0 ? (
                                favoriteMoviesData.map((movie, index) => (
                                    <MovieCard key={index} movie={movie} />
                                ))
                            ) : (
                                <p>You have no favorite movies listed.</p>
                            )}
                        </div>
                    </section>
                    <section className="serie-list-section">
                        <h2 className="serie-list-title">Favorite TV Shows</h2>
                        <div className="serie-list-container">
                            {favoriteSeriesData.length > 0 ? (
                                favoriteSeriesData.map((serie, index) => (
                                    <SerieCard key={index} serie={serie} />
                                ))
                            ) : (
                                <p>You have no favorite TV shows listed.</p>
                            )}
                        </div>
                    </section>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default MyAccount;
