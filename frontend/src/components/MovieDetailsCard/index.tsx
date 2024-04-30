


import './styles.css';
import { MovieDetailsDTO } from 'types/MovieDetailsDTO';

type Props = {
    movieDetails: MovieDetailsDTO;
}

const MovieDetailsCard = ({ movieDetails } : Props) => {

    return (
        <div className="base-card movie-details-card">
            <div className="movie-details-card-img-container">
                <img src={movieDetails.imgUrl} alt="Nome do filme" />
            </div>
            <div className="movie-details-card-info-container">
                <h6 className="movie-details-title">{movieDetails.title}</h6>
                <h6 className="movie-details-year">{movieDetails.year}</h6>
                <h6 className="movie-details-subtitle">{movieDetails.subTitle}</h6>

                <div className="movie-details-synopsis-container">
                    <span>{movieDetails.synopsis}</span>
                </div>
            </div>
        </div>
    );
}

export default MovieDetailsCard;