import SerieList from "../../components/SerieDetails/SeriesList.jsx";
import "./Series.css"

const types = [
    {
        type: "popular",
        name: "Popular",
    },
    {
        type: "top_rated",
        name: "Top Rated",
    },
    {
        type: "on_the_air",
        name: "On The Air",
    },
];

const Series = () => {
    return (
        <div>
            {types.map((ele) => {
                return <SerieList key={ele.type} type={ele.type} name={ele.name} />;
            })}
        </div>
    );
};

export default Series;