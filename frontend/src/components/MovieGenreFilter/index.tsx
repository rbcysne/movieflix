import Select from 'react-select';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { Controller, useForm } from 'react-hook-form';

import './styles.css';
import { requestBackend } from 'util/requests';
import { Genre } from 'types/Genre';

export type MovieGenreFilterData = {
    genre: Genre | null;
};

type Props = {
    onSubmitFilter: (data: MovieGenreFilterData) => void;
};

const MovieGenreFilter = ({ onSubmitFilter }: Props) => {

    const { handleSubmit, setValue, getValues, control } =
        useForm<MovieGenreFilterData>();

    const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

    const onSubmit = (searchData: MovieGenreFilterData) => {
        console.log('Gênero: ', searchData.genre?.name);
        onSubmitFilter(searchData);
    };

    useEffect(() => {
        const params: AxiosRequestConfig = {
            method: 'GET',
            url: '/genres',
            withCredentials: true,
        };

        requestBackend(params).then((response) => {
            setSelectGenres(response.data.content);
        });
    }, []);

    function handleGenreChange(value: Genre) {
        setValue('genre', value);

        const newSearchData: MovieGenreFilterData = {
            genre: getValues('genre')
        };

        onSubmitFilter(newSearchData);
    }

    return (
        <div className="base-card movie-filter-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="movie-genre-select-container">
                    <Controller
                        name="genre"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={selectGenres}
                                onChange={value =>
                                    handleGenreChange(value as Genre)
                                }
                                isClearable
                                classNamePrefix="movie-genre-select-filter"
                                placeholder="Gênero"
                                getOptionValue={(genre: Genre) =>
                                    String(genre.id)
                                }
                                getOptionLabel={(genre: Genre) =>
                                    genre.name
                                }
                            />
                        )}
                    />
                </div>
            </form>
        </div>
    );
};

export default MovieGenreFilter;
