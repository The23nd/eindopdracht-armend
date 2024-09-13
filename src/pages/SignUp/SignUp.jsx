import { useState } from "react";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (name.length < 4) {
            setMessage("Username must be at least 4 characters long.");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at" +
                " least 8 characters long.");
            return;
        }

        try {
            const response = await axios.post(
                "https://api.datavortex.nl/mcdb/users",
                {
                    email,
                    password,
                    username: name,
                    info: "testinfo",
                    authorities: [
                        {
                            authority: "USER"
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": "mcdb:tWqjvF8AfBQ7afYYRnGu"
                    }
                }
            );

            setMessage("Your registration has been successful.");
            console.log("Response:", response.data);

        } catch (error) {

            setMessage("This username already" +
                " exists. Please try again.");
            console.error("Error:", error);
        }
    }

    return (
        <div className="signup-container">
            <h1>Sign up for an account</h1>
            <p>Signing up for an account is free and easy</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="signup-label">
                    Username:
                </label>
                <input
                    type="text"
                    id="name"
                    className="signup-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email" className="signup-label">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    className="signup-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password" className="signup-label">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="register-button">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SignUp;
