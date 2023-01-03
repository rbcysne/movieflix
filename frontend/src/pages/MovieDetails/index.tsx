import { useParams } from "react-router-dom";

import MovieReviewForm from "components/MovieReviewForm";
import { hasAnyRoles } from "util/auth";
import MovieReviewList from "components/MovieReviewList";
import './styles.css';
import { useEffect, useState } from "react";
import { MovieReview } from "types/MovieReview";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/requests";

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const  { movieId } = useParams<UrlParams>();

    const [ movieReviews, setMovieReviews ] = useState<MovieReview[]>([]);

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movieId}/reviews`,
            withCredentials: true,
        };

        requestBackend(params)
            .then(response => {
                setMovieReviews(response.data);
            });
    }, [movieId]);

    const handleInsertReview = (newReview : MovieReview) => {
        const currentReviews = [...movieReviews];
        currentReviews.push(newReview);
        setMovieReviews(currentReviews);
    }
    
    return (
        <div className="container">
            
            <div className="movie-details-title-container">
                <h6>Tela detalhes do filme id: {movieId}</h6>
            </div>

            { hasAnyRoles(['ROLE_MEMBER']) && 
                (
                    <MovieReviewForm movieId={movieId} onInsertReview={handleInsertReview}/>
                )
            }
            
            <MovieReviewList movieReviews={movieReviews} />               
        </div>
    );
};

export default MovieDetails;