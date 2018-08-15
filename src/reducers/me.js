export function me(state = {}, action) {
    switch (action.type) {
        case "LOAD_MY_PROFILE":
            return {
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                profilePic: action.profilePic,
                email: action.email,
                city: action.city,
                languageSpeak: action.languageSpeak,
                country: action.country
            };

        case "SET_MY_PROFILE_PIC":
            return {
                ...state,
                profilePic: action.profilePic
            };
    }
    return state;
}
