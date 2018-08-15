export function reviews(state = {}, action) {
    switch (action.type) {
        case "GET_REVIEWS":
            return {
                ...state,
                [action.userId]: action.reviews
            };

        case "POST_REVIEWS":
            return {
                ...state,
                [action.userId]: [action.review, ...state[action.userId]]
            };
    }

    return state;
}
