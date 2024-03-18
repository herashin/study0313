import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
    console.log(json);
  };
  //gdgd
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loding....</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <div>
              <img src={movie.medium_cover_image} />
              <h3>{movie.title}</h3>
              <p>{movie.summary}</p>
              <p>{movie.genres}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Detail;
