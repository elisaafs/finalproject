export function reviews(state = {}, action) {
    switch (action.type) {
        case "GET_REVIEWS":
            return {
                ...state,
                [action.serviceId]: action.reviews
            };

        case "POST_REVIEW":
            return {
                ...state,
                [action.serviceId]: [action.comment, ...state[action.serviceId]]
            };
    }

    return state;
}
