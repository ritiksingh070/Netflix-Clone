import "./Home.scss";
import Row from "../row/Row";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

// https://api.themoviedb.org/3/movie/upcoming?api_key=447b988a658bc270593f6c2344c13f35

const apiKey = "447b988a658bc270593f6c2344c13f35";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);

      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);

      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);

      setTopRatedMovies(results);
    };

    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);

      setUpcomingMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    fetchUpcoming();
    fetchPopular();
    fetchNowPlaying();
    fetchTopRated();
    getAllGenre();
  }, []);

  console.log(popularMovies[0]);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
        <div>
          <button>
            <BiPlay /> Play{" "}
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>
      <Row title={"Popular on Netflix"} arr={popularMovies}></Row>
      <Row title={"Top Rated"} arr={topRatedMovies}></Row>
      <Row title={"Now Playing"} arr={nowPlayingMovies}></Row>
      <Row title={"Upcoming Movies"} arr={upcomingMovies}></Row>
      <div className="genreBox">
        {genre.map((item) => (
          <Link to={`genre/${item.id}`} key={item.id}>
            {" "}
            {item.name}{" "}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
