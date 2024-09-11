import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import "../../pages/LogIn/LogIn.css";

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { login } = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(false);

        try {
            const result = await axios.post('https://api.datavortex.nl/mcdb/users/authenticate', {
                "username": username,
                "password": password,
            });

            login(result.data.jwt);

        } catch (e) {
            console.error(e);
            setError(true);
        }
    }

    return (
        <div className="login-container">
            <h1>Login to your account</h1>
            <p>In order to add favorite movies or series in your list, you will need to login to your account:</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="login-label">
                    Username:
                </label>
                    <input
                        type="text"
                        id="name"
                        name="username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                <label htmlFor="password" className="login-label">
                    Password:
                </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                {error && <span className="error">The combination of username and password is incorrect.</span>}

                <button
                    type="submit"
                    className="form-button"
                >
                    Login
                </button>
            </form>
            <p>If you do not have an account, registering for an account is free and simple. <Link to="/signup">Click here</Link> to get started.</p>
        </div>
    );
}

export default LogIn;
