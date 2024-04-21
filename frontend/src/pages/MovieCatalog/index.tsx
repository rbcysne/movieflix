import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import MovieCard from '../../components/MovieCard';
import { Movie } from 'types/Movie';
import { Page } from 'types/Page';
import { Genre } from 'types/Genre';
import { requestBackend } from 'util/requests';
import './styles.css';



const MovieCatalog = () => {

    const [page, setPage] = useState<Page<Movie>>();

    const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

    const options = [
        {value: 'terror', label: 'Terror'},
        {value: 'comédia', label: 'Comédia'}
    ]

    const getMovies = (pageNumber: number) => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: "/movies",
            withCredentials: true,
            params: {
                page: pageNumber,
                size: 4,
            }
        };

        requestBackend(params)
            .then(response => {
                setPage(response.data);
            })
    }
    useEffect(() => {
        getMovies(0);
    }, []);

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: "/genres",
            withCredentials: true
        }

        requestBackend(params)
            .then(response => {
                setSelectGenres(response.data.content);
            })
    }, []);

    return (

        <div className="container my-4 movies-list-container">

            <form>
                <div className="row movies-list-title-container">
                    <Select
                        options={selectGenres}
                        getOptionValue={(genre: Genre) => String(genre.id)}
                        getOptionLabel={(genre: Genre) => genre.name}
                    />
                </div>
            </form>

            <div className="row">
                { page?.content.map((item) => {
                    return (
                        <div key={item.id}>
                            <Link to={`movies/${item.id}`}>
                                <MovieCard movie={item}/>
                            </Link>
                        </div>
                    );
                }) }
                {/* <div key={1}>
                    <Link to={`movies/1`}>
                        <span className="movie-item">Acessar /movies/1</span>
                    </Link>
                </div>
                <div key={2}>
                    <Link to={`movies/2`}>
                        <span className="movie-item">Acessar /movies/2</span>
                    </Link>
                </div> */}

            </div>
        </div>
    );
};

export default MovieCatalog;