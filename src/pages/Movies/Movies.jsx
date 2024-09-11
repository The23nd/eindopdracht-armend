import PropTypes from 'prop-types';
import MovieList from "../../components/MovieDetails/MovieList.jsx";
import "./Movies.css";

const types = [
  {
    type: "upcoming",
    name: "Upcoming",
  },
  {
    type: "popular",
    name: "Popular",
  },
  {
    type: "top_rated",
    name: "Top Rated",
  },
  {
    type: "now_playing",
    name: "Now Playing",
  },
];

const Movies = ({ type = types }) => {
  return (
      <div>
        {type.map((ele) => (
            <MovieList key={ele.type} type={ele.type} name={ele.name} />
        ))}
      </div>
  );
};

Movies.propTypes = {
  type: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
  ),
};

export default Movies;
