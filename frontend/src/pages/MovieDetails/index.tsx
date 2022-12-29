import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import ButtonIcon from "components/ButtonIcon";
import MovieReviewCard from "components/MovieReviewCard";
import { MovieReview } from "types/MovieReview";
import { ReviewFormData } from "types/ReviewFormData";
import { requestBackend } from "util/requests";

import './styles.css';

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const  { movieId } = useParams<UrlParams>();

    const [ movieReviews, setMovieReviews ] = useState<MovieReview[]>([]);

    const { register, handleSubmit, formState : { errors} } = useForm<ReviewFormData>();

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
        reviewFormData.movieId = parseInt(movieId);
        // saveReview(reviewFormData);
        console.log(reviewFormData);
        const params: AxiosRequestConfig = {
            method: 'POST',
            url: `/reviews`,
            withCredentials: true,
            data: reviewFormData,
        };

        requestBackend(params)
            .then(response => {
                console.log(response);
            })
    }

    return (
        <div className="container">
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="movie-details-title-container">
                    <h6>Tela detalhes do filme id: {movieId}
                        
                    </h6>
                </div>

            
                <div className="base-card new-review-card">
                    <div className="mb-4">
                        <input
                            { ...register("text", {
                                required: "Campo obrigatório"
                            })}
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