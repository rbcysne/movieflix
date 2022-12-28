import { AxiosRequestConfig } from "axios";
import ButtonIcon from "components/ButtonIcon";
import MovieReviewCard from "components/MovieReviewCard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Movie } from "types/Movie";
import { MovieReview } from "types/MovieReview";
import { ReviewFormData } from "types/ReviewFormData";
import { requestBackend } from "util/requests";

import './styles.css';

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const  { movieId } = useParams<UrlParams>();

    const [ movie, setMovie ] = useState<Movie>();

    const [ movieReviews, setMovieReviews ] = useState<MovieReview[]>();

    const { register, handleSubmit, formState : { errors} } = useForm<ReviewFormData>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: `/movies/${movieId}`,
            withCredentials: true,
        };

        requestBackend(params)
            .then(response => {
                setMovie(response.data);
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

    const onSubmit = ( reviewFormData : ReviewFormData ) => {
        // saveReview(reviewFormData)
        //     .then(response )
    }

    return (
        <div className="container">
            <div className="movie-details-title-container">
                <h6>Tela detalhes do filme id: {movie?.id}</h6>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="base-card new-review-card">
                    <p>Aqui</p>
                    <div className="mb-4">
                        <input
                            name="review"
                            type="text"
                            placeholder="Deixe sua avaliação aqui"
                            className="form-control base-input"
                        />
                    </div>
                    <div className="review-submit">
                        <ButtonIcon text="Salvar Avaliação" />
                    </div>
                </div>
            </form>

            <div className="base-card reviews-card">
                { movieReviews?.map((item) => {
                    return (
                        <div key={item.id}>
                            {/* <span>{item.text}</span> */}
                            <MovieReviewCard review={item} />
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default MovieDetails;