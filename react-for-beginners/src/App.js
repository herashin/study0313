import Button from "./Button";
import styles from "./App.module.css";
//import { useState, useEffect } from "react";
import { func } from "prop-types";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
    // fetch(
    //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    // )
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setMovies(json.data.movies);
    //     setLoading(false);
    //   });
  }, []);
  console.log(movies);
  return (
    <div>
      {loading ? (
        <h1>Loding....</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img src={movie.medium_cover_image} />
              <h2>{movie.title}</h2>

              <p>{movie.summary}</p>
              <ul>
                {movie.genres.map((lis) => (
                  <li key={lis}>{lis} </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
