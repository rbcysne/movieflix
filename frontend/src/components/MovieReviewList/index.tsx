
import MovieReviewCard from "components/MovieReviewCard";
import { MovieReview } from "types/MovieReview";
import './styles.css';

type Props = {
    movieReviews: MovieReview[];
}

const MovieReviewList = ( { movieReviews } : Props ) => {

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