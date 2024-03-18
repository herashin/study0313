import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie(/* prop object */ { cover_image, title, summary, genres }) {
  /*Movie 컴포넌트가   medium_cover_image,title,summary,genres 이 정보들을  
    부모 컴포넌트(parent component로부터 받아온다고 정의함 )
    위 prop들은 내 마음대로 정의해도 됨. 
    */
  return (
    <div>
      <img src={cover_image} />
      <h2>
        <Link to="/movie">{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((lis) => (
          <li key={lis}>{lis} </li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  // genres는 배열형태인데, 내부요소중 string만 가져오기 위해서
  // arrayOf를 사용한다. 이 기능은 배열 내부요소의 타입을 검사하는 기능으로,
  // 보다 안정적인 prop을 다룰 수 있게 해준다.
};

export default Movie;
