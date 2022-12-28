import { MovieReview } from "types/MovieReview";
import { ReactComponent as StarImage } from 'assets/images/star.svg';

import './styles.css';

type Props = {
    review: MovieReview;
}

const MovieReviewCard = ( { review } : Props ) => {
    return (
        <div className="review-container">
            <div className="review-top-container">
                <StarImage />
                <span>{review.user.name}</span>
            </div>

            <div className="review-content-container">
                <p>{review.text}</p>
            </div>
        </div>
    );
};

export default MovieReviewCard;