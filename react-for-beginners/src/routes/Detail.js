import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.css";
import { useColor } from "color-thief-react";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [textColorData, setTextColorData] = useState("#112233"); // 변수 이름 변경

  const largeCoverRef = useRef(null); // 요소에 대한 ref 생성

  const [src, setSrc] = useState(""); // src를 저장할 state 생성

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await response.json();
        setMovies(json.data.movie);
        //    setTextColorData(json.data.movie);
        setLoading(false);
        setSrc(json.data.movie.large_cover_image);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    getMovie();
  }, [id]);

  // useColor 훅을 useEffect 밖으로 이동
  const {
    data: textColor,
    loading: colorLoading,
    error: colorError,
  } = useColor(src ? src : null, "rgbString", {
    crossOrigin: "anonymous",
    quality: 10,
  });
  useEffect(() => {
    if (textColor && !colorLoading && !colorError) {
      setTextColorData(textColor);
    }
  }, [textColor, colorLoading, colorError]);
  return (
    <div>
      {loading ? (
        <h1>Loding....</h1>
      ) : (
        <div className="detail_wrap" style={{ backgroundColor: textColorData }}>
          <p>textColorData : {textColorData}</p>
          <div className="detail_contaner">
            <img ref={largeCoverRef} src={movies.large_cover_image} />
            <div
              className="detail_back_box"
              style={{
                backgroundImage: `url( ${movies.background_image_original}  )`,
              }}
            >
              <h2 style={{ color: textColorData }}>{movies.title}</h2>
              <p style={{ color: textColorData }}>{movies.description_intro}</p>
              <ul style={{ color: textColorData }}>
                {movies.genres.map((lis) => (
                  <li key={lis}>{lis} </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
