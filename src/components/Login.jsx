import { useState } from "react";
import "../styles/singup.css";

const Singup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className="signup-container">
      <label htmlFor="email" className="signup-label">
        Email
      </label>
      <input
        type="text"
        id="email"
        className="signup-input"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <label htmlFor="password" className="signup-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="signup-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="register">Login</button>
    </div>
  );
};

export default Singup;
