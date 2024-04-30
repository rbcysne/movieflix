import { AxiosRequestConfig } from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import './styles.css';
import MovieReviewForm from "components/MovieReviewForm";
import { hasAnyRoles } from "util/auth";
import MovieReviewList from "components/MovieReviewList";
import { MovieReview } from "types/MovieReview";
import { requestBackend } from "util/requests";
import MovieDetailsCard from "components/MovieDetailsCard";
import { MovieDetailsDTO } from "types/MovieDetailsDTO";

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const  { movieId } = useParams<UrlParams>();

    const [ movieReviews, setMovieReviews ] = useState<MovieReview[]>([]);

    const [ movieDetails, setMovieDetails ] = useState<MovieDetailsDTO>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movieId}`,
            withCredentials: true,
        };

        requestBackend(params)
            .then(response => {
                setMovieDetails(response.data);
            });
    }, [movieId]);

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
            
            { movieDetails ? 
                <div className="movie-details-container">
                    <MovieDetailsCard movieDetails={movieDetails}/>
                </div>
                : ''
            }

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