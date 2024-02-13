import SerieList from "../components/SeriesList";
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