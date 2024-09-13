import logo from "../../assets/TMBD_Blue_logo.svg";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-container py-5 text-white">
                <section className="footer-flex">
                    <article
                        className="footer-col">
                        <img
                            src={logo}
                            alt="The Movie Database Logo"
                            width={100}
                        />
                    </article>
                    <nav className="footer-col">
                        <b>BASICS</b>
                        <a href="https://www.instagram.com/a2m3nd" target="_blank">About
                            Me</a>
                        <a href="https://www.GitHub.com/The23nd" target="_blank">GitHub</a>
                        <a href="https://developer.themoviedb.org/docs"
                           target="_blank">API</a>
                    </nav>
                    <article
                        className="footer-col">
                        <b>TheMovieDB by</b>
                        <p>©Armend Hajdari (NOVI
                            Hogeschool)</p>
                    </article>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
