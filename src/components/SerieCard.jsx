import React from 'react';
import { useNavigate } from "react-router-dom"

const SerieCard = ({ serie }) => {
    const navigate = useNavigate()

    const formatReleaseDate = (dateString) => {
        if (!dateString) return "Release date not available"; // Handle cases where release date is not available
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className='card' onClick={() => navigate(`serie/${serie.id}`)}>


            <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.title} className='card-img-top rounded' loading='lazy' />
            <div className='card-body'>

                <b>{serie.title}</b>
                <p>{formatReleaseDate(serie.first_air_date)}</p> {/* Use first_air_date for series */}
            </div>

        </div>
    );
};

export default SerieCard;
