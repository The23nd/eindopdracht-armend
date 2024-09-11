import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import logo from "../../assets/TMDB_Blue_short.svg";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContextProvider.jsx";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const { isAuth, logout } = useContext(AuthContext);

  useEffect(() => {
    setIsLoggedIn(isAuth);
  }, [isAuth]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > prevScrollY ? 'down' : 'up');
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const navbarClass = scrollDirection === 'down' ? 'nav hidden' : 'nav show';

  return (
      <nav className={navbarClass} aria-label="Main Navigation">
        <div className="nav-container">
          <Link className="nav-logo" to="/" aria-label="Home">
            <img src={logo} alt="Logo" width={150} />
          </Link>
          <ul className="nav-items">
            <li>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li>
              <Link className="nav-link" to="/movies">Movies</Link>
            </li>
            <li>
              <Link className="nav-link" to="/series">Series</Link>
            </li>
            {isLoggedIn ? (
                <>
                  <li>
                    <Link className="nav-link" to="/myaccount">My Account</Link>
                  </li>
                  <li>
                    <button className="nav-btn" onClick={handleLogout} aria-label="Log Out">
                      Log Out
                    </button>
                  </li>
                </>
            ) : (
                <div className="nav-auth">
                  <li>
                    <Link className="nav-link" to="/SignUp">Signup</Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/LogIn">Login</Link>
                  </li>
                </div>
            )}
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
