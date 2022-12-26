import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/Movie';
import { Page } from 'types/Page';
import { requestBackend } from 'util/requests';
import MovieCard from '../../components/MovieCard';
import './styles.css';

const Movies = () => {

    const [page, setPage] = useState<Page<Movie>>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: "/movies",
            withCredentials: true,
        }

        requestBackend(params)
            .then(response => {
                setPage(response.data);
            })
    },[]);

    return (

        <div className="container my-4 movies-list-container">
            <div className="row movies-list-title-container">
                <h1>Tela listagem de filmes</h1>
            </div>

            <div className="row">
                { page?.content.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link to={`movies/${item.id}`}>
                                <MovieCard movie={item}/>
                            </Link>
                        </div>
                    );
                })
             }
            </div>
        </div>
    );
};

export default Movies;