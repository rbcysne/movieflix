import { Link } from "react-router-dom";
import { Movie } from "types/Movie";

type Props = {
  movie: Movie;
};

const MovieCard = ( { movie } : Props ) => {
  return (
    <div className="base-card movie-card">
        <div>
            <img src={movie.imgUrl} alt="Nome do filme" />
        </div>

        <div>
            {movie.title}
        </div>
    </div>
  );
};

export default MovieCard;
