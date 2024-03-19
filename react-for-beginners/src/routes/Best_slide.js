import { Link } from "react-router-dom";
import style from "./Best_slide.css";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

{
  /* <Helmet>
  <meta charset="utf-8" />
  <title>Movie Best Slide</title>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
  />

  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</Helmet>; */
}
function Best_slid() {
  const [loading, setLoading] = useState(true);

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.5&sort_by=year`
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="contaner_back">
      {loading ? (
        <h1>Loding....</h1>
      ) : (
        <div className="swiper mySwiper">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation={true}
            className="my-swiper"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img src={movie.large_cover_image} />
                </Link>
              </SwiperSlide>
            ))}

            {/* Add more SwiperSlide components for additional slides */}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Best_slid;
