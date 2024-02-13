import MovieList from "../components/MovieList";
const types = [
  {
    type: "top_rated",
    name: "Top Rated",
  },
  {
    type: "popular",
    name: "Popular",
  },
  {
    type: "upcoming",
    name: "Upcoming",
  },
  {
    type: "now_playing",
    name: "Now Playing",
  },
];

const Movies = () => {
  return (
    <div>
      {types.map((ele) => {
        return <MovieList key={ele.type} type={ele.type} name={ele.name} />;
      })}
    </div>
  );
};

export default Movies;
