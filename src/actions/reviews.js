import axios from "../axios";
import { loadUser } from "./opp";

export async function getReviews(dispatch, serviceId) {
    const { data } = await axios.get(`/reviews/${serviceId}`);
    data.forEach(comment => {
        dispatch(loadUser(comment.author_id));
    });
    return {
        type: "GET_REVIEWS",
        serviceId,
        reviews: data
    };
}

export async function postReviews(review, title, serviceId) {
    const { data } = await axios.post("/review", {
        serviceId,
        title,
        comment: review
    });
    return {
        type: "POST_REVIEW",
        serviceId,
        comment: data.review
    };
}
