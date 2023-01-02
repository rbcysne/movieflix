import { useParams } from "react-router-dom";

import MovieReviewForm from "components/MovieReviewForm";
import { hasAnyRoles } from "util/auth";
import MovieReviewList from "components/MovieReviewList";
import './styles.css';

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const  { movieId } = useParams<UrlParams>();
    
    return (
        <div className="container">
            
            <div className="movie-details-title-container">
                <h6>Tela detalhes do filme id: {movieId}</h6>
            </div>

            { hasAnyRoles(['ROLE_MEMBER']) && 
                (
                    <MovieReviewForm movieId={movieId} />
                )
            }
            
            <MovieReviewList movieId={movieId} />               
        </div>
    );
};

export default MovieDetails;