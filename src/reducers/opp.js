export function users(state = {}, action) {
    switch (action.type) {
        case "USER_LOADED":
            return {
                ...state,
                [action.userId]: action.userInformation
            };
    }

    return state;
}
