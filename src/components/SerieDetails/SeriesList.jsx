import { useEffect, useState } from "react";
import axios from "axios";
import SerieCard from "./SerieCard.jsx";
import "../SerieDetails/SerieDetails.css";

const SeriesList = ({ type, name }) => {
    const [series, setSeries] = useState([]);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${type}?api_key=${apiKey}`
                );
                setSeries(response.data.results);
            } catch (error) {
                console.error("Error fetching series data:", error);
            }
        };

        fetchData();
    }, [type]);

    return (
        <section className="serie-list-section">
            <h2 className="serie-list-title">{name}</h2>
            <div className="serie-list-container">
                {series.map((serie) => (
                    <SerieCard key={serie.id} serie={serie} />
                ))}
            </div>
        </section>
    );
};

export default SeriesList;
