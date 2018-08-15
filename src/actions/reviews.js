import axios from "../axios";

export async function loadUser(userId) {
    const { data } = await axios.get(`/otheruser/${userId}`);
    return {
        type: "USER_LOADED",
        userId,
        userInformation: data
    };
}

export async function getReviews(dispatch, userId) {
    const { data } = await axios.get(`/reviews/${userId}`);
    data.forEach(comment => {
        dispatch(loadUser(comment.author_id));
    });
    return {
        type: "GET_REVIEWS",
        userId,
        reviews: data
    };
}

export async function postReviews(review, userId) {
    const { data } = await axios.post("/review", {
        userId,
        review
    });
    return {
        type: "POST_REVIEW",
        userId,
        comment: data.review
    };
}
