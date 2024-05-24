import "./Row.scss";
import Card from "../card/Card";

const imgUrl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, arr }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item,index) => (
          <Card key={index} videoImg={`${imgUrl}/${item.poster_path}`} />
        ))}
      </div>
    </div>
  );
};

export default Row;
