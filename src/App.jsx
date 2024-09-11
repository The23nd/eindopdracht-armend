import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Movies from "./pages/Movies/Movies.jsx";
import Series from "./pages/Series/Series.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import MovieDetail from "./components/MovieDetails/MovieDetail.jsx";
import SerieDetail from "./components/SerieDetails/SerieDetail.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import MyAccount from "./pages/MyAccount/MyAccount.jsx";
import "./App.css"

const App = () => {
    const formatReleaseDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/search/:query" element={<SearchResults formatReleaseDate={formatReleaseDate} />}/>
                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="/series" element={<Series />} />
                <Route path="/series/:id" element={<SerieDetail />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
