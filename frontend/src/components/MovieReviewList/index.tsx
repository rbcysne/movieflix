import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

import MovieReviewCard from "components/MovieReviewCard";
import { MovieReview } from "types/MovieReview";
import { requestBackend } from "util/requests";
import './styles.css';

type Props = {
    movieId: string;
}

const MovieReviewList = ( { movieId } : Props ) => {

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

    return (
        <div className="base-card reviews-list-card">
        { movieReviews?.map((item) => {
                    return (
                        <div key={item.id}>
                            {/* <span>{item.text}</span> */}
                            <MovieReviewCard review={item} />
                        </div>
                    )
                })}
        </div>
    );
};


export default MovieReviewList;