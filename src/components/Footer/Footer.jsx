import logo from '../../assets/TMBD_Blue_logo.svg';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container py-5 text-white">
                <section className="footer-flex">
                    <article className="footer-col">
                        <img
                            src={logo}
                            alt="The Movie Database Logo"
                            width={100}
                        />
                    </article>
                    <article className="footer-col">
                        <b>TheMovieDB by</b>
                        <p>©Armend Hajdari (NOVI Hogeschool)</p>
                    </article>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
