import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import { FacebookIcon,  WhatsappIcon } from "react-share";
import "./SerieDetails.css";

const SerieDetail = () => {
    const [serie, setSerie] = useState({});
    const [trailerKey, setTrailerKey] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const { favoriteSeries, updateFavoriteSeries, isAuth } = useContext(AuthContext);
    const { id } = useParams();

    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(null);

    useEffect(() => {
        const fetchSerieDetails = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
                );
                setSerie(response.data);

                const videosResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
                );
                const firstVideo = videosResponse.data.results[0];
                if (firstVideo && firstVideo.key) {
                    setTrailerKey(firstVideo.key);
                }

                // Load saved rating from localStorage
                const savedRating = localStorage.getItem(`serieRating_${id}`);
                if (savedRating) {
                    setUserRating(parseInt(savedRating, 10));
                }

                const favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
                if (favoriteSeries.includes(id)) {
                    setIsFavorited(true);
                }
            } catch (error) {
                console.error("Error fetching series details:", error);
            }
        };

        fetchSerieDetails();
    }, [id]);

    useEffect(() => {
        setIsFavorited(favoriteSeries.includes(id));
    }, [favoriteSeries]);

    const playTrailer = () => setShowTrailer(true);
    const closeTrailer = () => setShowTrailer(false);

    const toggleFavorite = () => {
        if (isFavorited) {
            const updatedFavorites = favoriteSeries.filter((serieId) => serieId !== id);
            localStorage.setItem("favoriteSeries", JSON.stringify(updatedFavorites));
        } else {
            favoriteSeries.push(id);
            localStorage.setItem("favoriteSeries", JSON.stringify(favoriteSeries));
        }
        updateFavoriteSeries();
    };

    const handleRating = (rating) => {
        setUserRating(rating);
        localStorage.setItem(`serieRating_${id}`, rating);
    };

    const opts = {
        height: "500",
        width: "80%",
        playerVars: { autoplay: 1 },
    };

    const formatReleaseDate = (dateString) => {
        if (!dateString) return "Release date not available";
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    };

    const serieUrl = `https://www.themoviedb.org/tv/${id}`;

    return (
        <article className="serie-detail-container">
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
            <section className="serie-overview-content">
                <figure className="serie-detail-poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w400${serie.poster_path}`}
                        alt={serie.name}
                        className="poster-img"
                        loading="lazy"
                    />
                </figure>
                <section className="serie-detail-info">
                    <h2 className="serie-title">{serie.name || "Loading..."}</h2>
                    <h3 className="serie-subtitle">Overview</h3>
                    <p className="serie-overview">{serie.overview || "No overview available"}</p>
                    <p className="serie-release-date">First Air Date: {formatReleaseDate(serie.first_air_date)}</p>
                    <button className="btn watch-trailer" onClick={playTrailer} aria-label="Watch trailer">
                        Watch Trailer
                    </button>
                    {isAuth && (
                        <>
                            <button className="btn favorite-btn" onClick={toggleFavorite} aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}>
                                {isFavorited ? "Unfavorite" : "Favorite"}
                            </button>
                            <div className="star-rating">
                                <p className="rate-this-serie">Rate this series:</p>
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
                            <div className="share-buttons">
                                <p className="share-this-serie">Share this series:</p>
                                <button
                                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${serieUrl}`, "_blank")}>
                                    <FacebookIcon size={32} round/>
                                </button>
                                <button onClick={() => window.open(`https://api.whatsapp.com/send?text=Check out this serie:${serieUrl}`, "_blank")}>
                                    <WhatsappIcon size={32} round/>
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </section>
        </article>
    );
};

export default SerieDetail;
