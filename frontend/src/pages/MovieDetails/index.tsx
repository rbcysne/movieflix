import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "types/Movie";
import { BASE_URL } from "util/requests";

import './styles.css';

type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const  { movieId } = useParams<UrlParams>();

    const [ movie, setMovie ] = useState<Movie>();

    useEffect(() => {
        axios
            .get(`${BASE_URL}/movies/${movieId}`)
            .then((response) => {
                setMovie(response.data);
            })
    }, [movieId]);

    return (
        <div>
            <h6>Movie details</h6>
            <p>{movie?.title}</p>
        </div>
    );
};

export default MovieDetails;