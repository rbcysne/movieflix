import { MovieDTO } from 'types/MovieDTO';
import './styles.css';

type Props = {
    movie: MovieDTO;
};

const MovieCard = ({ movie }: Props) => {
    return (
        <div className="base-card movie-card">
            <div className="card-image-container">
                <img src={movie.imgUrl} alt="Nome do filme" />
            </div>
            <div className="card-info-container">
                <h6 className="movie-title">{movie.title}</h6>
                <h6 className="movie-year">{movie.year}</h6>
                <h6 className="movie-subtitle">{movie.subTitle}</h6>
            </div>
        </div>
    );
};

export default MovieCard;
