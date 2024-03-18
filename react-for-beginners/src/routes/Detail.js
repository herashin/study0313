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
    setMovies(json.data.movie);
    setLoading(false);
    console.log(json);
  };

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loding....</h1>
      ) : (
        <div>
          <div>
            <img src={movies.medium_cover_image} />
            <h3>{movies.title}</h3>
            <p>{movies.summary}</p>
            <ul>
              {movies.genres.map((lis) => (
                <li key={lis}>{lis} </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
