export function serviceSearch(state = {}, action) {
    switch (action.type) {
        case "CHANGE_SEARCH_PLACE_ID":
            return {
                ...state,
                placeId: action.placeId,
                placeDescription: action.placeDescription
            };

        case "CHANGE_SEARCH_LANGUAGE":
            return {
                ...state,
                language: action.language
            };

        case "CHANGE_SEARCH_CATEGORY":
            return {
                ...state,
                category: action.category
            };

        case "CHANGE_SEARCH_SUBCATEGORY":
            return {
                ...state,
                subcategory: action.subcategory
            };

        case "CHANGE_SEARCH_RESULTS":
            return {
                ...state,
                searchResults: action.searchResults
            };
    }
    return state;
}
