import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedText = text.trim();

        if (trimmedText === "") {
            setError("Sorry, search another title because this doesn't exist.");
        } else {
            setError("");
            navigate(`/search/${trimmedText}`);
        }
    };

    return (
        <header>
            <div className="container-header">
                <h1 className='fs-1'>Welcome</h1>
                <h2>Millions of movies and TV shows to discover. Explore now.</h2>
            </div>
            <div className="container-header">
                <form className='header-d-flex' onSubmit={handleSubmit}>
                    <label htmlFor="search" className="visually-hidden">Search for a Movie or TV show</label> {/* Verbeterde toegankelijkheid */}
                    <input
                        id="search"
                        type="text"
                        placeholder='Search for a Movie or a TV show...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        aria-label="Search for a Movie or a TV show"
                    />
                    <button className="submit" type="submit">Search</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </header>
    );
};

export default Header;
