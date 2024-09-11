import { useNavigate } from "react-router-dom";

const SerieCard = ({ serie }) => {
    const navigate = useNavigate();

    const formatReleaseDate = (dateString) => {
        if (!dateString) return "Release date not available";
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className='serie-card' onClick={() => navigate(`/series/${serie.id}`)}>
            <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} className='serie-card-img' loading='lazy' />
            <div className='serie-card-body'>
                <b>{serie.name}</b>
                <p>{formatReleaseDate(serie.first_air_date)}</p>
            </div>
        </div>
    );
};

export default SerieCard;
