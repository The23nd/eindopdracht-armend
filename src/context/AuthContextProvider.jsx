import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [authState, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "done",
        favoriteMovies: [],
        favoriteSeries: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            const decoded = jwtDecode(token);
            void fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
                favoriteMovies: [],
                favoriteSeries: []
            });
        }
    }, []);

    function login(JWT) {
        localStorage.setItem("token", JWT);
        const decoded = jwtDecode(JWT);
        fetchUserData(decoded.sub, JWT, "/");
    }

    function logout() {
        localStorage.removeItem("token");
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: "done",
            favoriteMovies: [],
            favoriteSeries: []
        });
        console.log("Member logged out");
        navigate("/");
    }

    function updateFavoriteMovies() {
        const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
        toggleIsAuth({
            ...authState,
            favoriteMovies
        });
    }

    function updateFavoriteSeries() {
        const favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
        toggleIsAuth({
            ...authState,
            favoriteSeries
        });
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const result = await axios.get(`https://api.datavortex.nl/mcdb/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
            const favoriteSeries = JSON.parse(localStorage.getItem("favoriteSeries")) || [];
            toggleIsAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email
                },
                status: "done",
                favoriteMovies,
                favoriteSeries
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
                favoriteMovies: [],
                favoriteSeries: []
            });
        }
    }

    const contextData = {
        ...authState,
        login,
        logout,
        updateFavoriteMovies,
        updateFavoriteSeries
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;