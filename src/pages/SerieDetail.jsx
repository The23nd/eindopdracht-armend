import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";

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

                console.log("First Air Date:", response.data.first_air_date); // Log the first_air_date

                // Fetch serie videos to get the trailer key
                const videosResponse = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
                );

                // Assuming the first video is the trailer
                const firstVideo = videosResponse.data.results[0];
                if (firstVideo && firstVideo.key) {
                    setTrailerKey(firstVideo.key);
                }
            } catch (error) {
                console.error("Error fetching serie details:", error);
            }
        };

        fetchSerieDetails();
    }, [id]);

    const myStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/w500${serie.backdrop_path})`,
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

    // Function to format the release date
    const formatReleaseDate = (dateString) => {
        if (!dateString) return "Release date not available"; // Handle cases where release date is not available
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
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
                        src={`https://image.tmdb.org/t/p/w400${serie.poster_path}`}
                        alt={serie.name}
                        className="img-fluid rounded"
                        loading="lazy"
                    />
                </div>
                <div className="col-lg-8 col-md-6 text-light d-flex flex-column align-items-start justify-content-center">
                    <h2>{serie.name}</h2>
                    <p>Overview</p>
                    <p>{serie.overview}</p>
                    <p>Popularity: {serie.popularity}</p>
                    <p>First Air Date: {formatReleaseDate(serie.first_air_date)}</p> {/* Format release date */}
                    <button className="btn btn-outline-light" onClick={playTrailer}>
                        Watch Trailer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SerieDetail;
