import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import ButtonIcon from 'components/ButtonIcon';
import { ReviewFormData } from 'types/ReviewFormData';
import { requestBackend } from 'util/requests';
import './styles.css';
import { MovieReview } from 'types/MovieReview';


type Props = {
    movieId: string;
    onInsertReview: (review: MovieReview) => void;
}

const MovieReviewForm = ( { movieId, onInsertReview } : Props) => {

    const { register, handleSubmit, formState : { errors}, setValue } = useForm<ReviewFormData>();

    const onSubmit = ( reviewFormData : ReviewFormData ) => {
        reviewFormData.movieId = parseInt(movieId);

        console.log(reviewFormData);
        const params: AxiosRequestConfig = {
            method: 'POST',
            url: '/reviews',
            withCredentials: true,
            data: reviewFormData,
        };

        requestBackend(params)
            .then(response => {
                setValue('text', '');
                onInsertReview(response.data);
                toast.info("Avaliação enviada com sucesso!");
                console.log(response);
                
            })
            .catch(() => {
                toast.error("Erro ao cadastrar avaliação!");
            })
    }

    return (
        <div className="base-card new-review-card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-4">
                        <input
                            { ...register("text", {
                                required: "Campo obrigatório"
                            })}
                            name="text"
                            type="text"
                            placeholder="Deixe sua avaliação aqui"
                            className={ `form-control base-input ${ errors.text ? 'is-invalid' : ''}` }
                        />
                        <div className="invalid-feedback d-block">{ errors.text?.message }</div>
                    </div>
                    <div className="review-submit">
                        <ButtonIcon text="Salvar Avaliação" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MovieReviewForm;