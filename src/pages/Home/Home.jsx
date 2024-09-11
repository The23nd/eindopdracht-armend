import Header from "../../components/Header/Header.jsx";
import Movies from "./../../pages/Movies/Movies.jsx"
import "./Home.css"

const Home = () => {
    const types = [
        {
            type: "now_playing",
            name: "Now Playing",
        },
    ];
    return (
        <>
            <Header/>
            <Movies type={types}/>
        </>
    );
};

export default Home;