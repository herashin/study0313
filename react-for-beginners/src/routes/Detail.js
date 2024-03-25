import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState(null);
  const [backColor, setBackColor] = useState("");

  const extractImageColor = (imageUrl) => {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let red = 0;
      let green = 0;
      let blue = 0;

      for (let i = 0; i < data.length; i += 4) {
        red += data[i];
        green += data[i + 1];
        blue += data[i + 2];
      }

      const pixelCount = data.length / 4;
      red = Math.round(red / pixelCount);
      green = Math.round(green / pixelCount);
      blue = Math.round(blue / pixelCount);

      const averageColor = `rgb(${red}, ${green}, ${blue})`;
      setBackColor(averageColor); // 색상을 상태로 업데이트
      console.log(averageColor);
    };

    image.src = imageUrl;
  };

  // useEffect를 사용하여 id가 변경될 때마다 새로운 영화 데이터를 가져오도록 수정
  useEffect(() => {
    const getMovie = async () => {
      setLoading(true); // 로딩 중 상태로 설정

      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const json = await response.json();
        setMovies(json.data.movie);
        setLoading(false); // 로딩 완료 상태로 설정
        console.log(json.data.movie.large_cover_image);
        extractImageColor(json.data.movie.large_cover_image);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    getMovie();
  }, [id]);

  // 이미지 로드 후에 색상 추출 및 상태 업데이트

  // useEffect(() => {
  //   const images = document.querySelectorAll(".detail_img");
  //   images.forEach((image) => {
  //     image.onload = () => {
  //       const src = image.getAttribute("src");
  //       extractImageColor(src);
  //       console.log("hii");
  //     };
  //   });
  // }, [id]);
  return (
    <div>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="detail_wrap" style={{ backgroundColor: "#000" }}>
          <p></p>
          <div className="detail_contaner">
            <img
              className="detail_img"
              src={movies.large_cover_image}
              alt="Movie Cover"
            />

            <div
              className="detail_back_box"
              style={{
                backgroundImage: `url(${movies.background_image_original})`,
              }}
            >
              <div className="box_area">
                <h2>{movies.title}</h2>
                <p>{movies.description_intro}</p>
                <ul>
                  {movies.genres.map((genre) => (
                    <li key={genre}>{genre}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
