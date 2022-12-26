
import { Movie } from "types/Movie";
import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = ( { movie } : Props ) => {
  return (
    <div className="base-card movie-card">
      <div className="card-image-container">
          <img src={movie.imgUrl} alt="Nome do filme" />
      </div>
      <div className="card-title-container">
          <h6>{movie.title}</h6>
      </div>

    </div>
  );
};

export default MovieCard;
