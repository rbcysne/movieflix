import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MovieCard from '../../components/MovieCard';
import { MovieDTO } from 'types/MovieDTO';
import { SpringPage } from 'types/SpringPage';

import { requestBackend } from 'util/requests';
import './styles.css';
import MovieGenreFilter, {
    MovieGenreFilterData,
} from 'components/MovieGenreFilter';

type ControlData = {
    activePage: number;
    searchData: MovieGenreFilterData;
};

const MovieCatalog = () => {
    const [page, setPage] = useState<SpringPage<MovieDTO>>();

    const [controlData, setControlData] = useState<ControlData>({
        activePage: 0,
        searchData: { genre: null },
    });

    const getMovies = useCallback(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: '/movies',
            withCredentials: true,
            params: {
                page: controlData.activePage,
                size: 4,
                genreId: controlData.searchData.genre?.id,
            },
        };

        requestBackend(params).then((response) => {
            setPage(response.data);
        });
    }, [controlData]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    function handleSubmitFilter(data: MovieGenreFilterData) {
        setControlData({ activePage: 0, searchData: data });
    }


    return (
        <div className="container my-4 movies-list-container">
            <div className="movie-genre-filter-container">
                <MovieGenreFilter onSubmitFilter={handleSubmitFilter} />
            </div>

            <div className="row">
                {page?.content.map((movie) => {
                    return (
                        <div
                            className="col-sm-6 col-lg-4 col-xl-3"
                            key={movie.id}
                        >
                            <Link to={`movies/${movie.id}`}>
                                <MovieCard movie={movie} />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MovieCatalog;
