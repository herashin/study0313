import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.css";
import { useColor } from "color-thief-react";
import { getAverColor } from "./canvas";
function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const { R, G, B } = getAverColor(); // canvas.js 파일에서 배경색을 변경하는 함수를 호출하여 색상 값을 가져옴
    document.body.style.background = `rgb( ${R}, ${G}, ${B} )`; // 색상 값을 사용하여 배경색을 변경
  }, []); // 컴포넌트가 처음 렌더링 될 때 한 번만 실행

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
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    getMovie();
  }, [id]);

  const {
    data: colors,
    loading: colorLoading,
    error: colorError,
  } = useColor(
    movies?.large_cover_image, // 이미지 URL
    "rgbString" // 추출된 색상 포맷
  );
  console.log(colors);
  return (
    <div>
      {loading ? (
        <h1>Loding....</h1>
      ) : (
        <div className="detail_wrap">
          <p></p>
          <div className="detail_contaner">
            <img className="detail_img" src={movies.large_cover_image} />
            <div
              className="detail_back_box"
              style={{
                backgroundImage: `url( ${movies.background_image_original}  )`,
              }}
            >
              <h2>{movies.title}</h2>
              <p>{movies.description_intro}</p>
              <ul>
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
