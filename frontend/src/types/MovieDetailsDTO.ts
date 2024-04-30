import { MovieReview } from "./MovieReview";

export type MovieDetailsDTO = {
    id: number;
    title: string;
    subTitle: string;
    year: number;
    imgUrl: string;
    synopsis: string;
    reviews: MovieReview[] | undefined;
};
