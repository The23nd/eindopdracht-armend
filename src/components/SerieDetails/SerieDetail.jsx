import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import "./SerieDetails.css";

const SerieDetail = () => {
    const [serie, setSerie] = useState({});
    const [trailerKey, setTrailerKey] = useState("");
    const [showTrailer, setShowTrailer] = useState(false);
    const { id } = useParams();

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
            } catch (error) {
                console.error("Error fetching series details:", error);
            }
        };

        fetchSerieDetails();
    }, [id]);

    const playTrailer = () => setShowTrailer(true);
    const closeTrailer = () => setShowTrailer(false);

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

    return (
        <article className="serie-detail-container">
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
                    <p className="serie-overview">
                        {serie.overview || "No overview available"}
                    </p>
                    <p className="serie-release-date">
                        First Air Date: {formatReleaseDate(serie.first_air_date)}
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

export default SerieDetail;
