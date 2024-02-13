import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SerieCard from './SerieCard';

const SeriesList = ({ type, name }) => {
    const [series, setSeries] = useState([]);
    const apikey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${type}?api_key=${apikey}`
                );
                setSeries(response.data.results);
            } catch (error) {
                console.error('Error fetching series data:', error);
            }
        };

        fetchData();
    }, [type]);

    return (
        <div className='container-fluid my-5 p-4'>
            <h2 className='mb-3'>{name}</h2>
            <div className="serie-list">
                {series.map((serie) => (
                    <SerieCard key={serie.id} serie={serie} />
                ))}
            </div>
        </div>
    );
};

export default SeriesList;
