export function changeSearchPlaceId({ placeId, placeDescription }) {
    return {
        type: "CHANGE_SEARCH_PLACE_ID",
        placeId,
        placeDescription
    };
}

export function changeSearchLanguage(language) {
    return {
        type: "CHANGE_SEARCH_LANGUAGE",
        language
    };
}

export function changeSearchCategory(category) {
    return {
        type: "CHANGE_SEARCH_CATEGORY",
        category
    };
}

export function changeSearchSubcategory(subcategory) {
    return {
        type: "CHANGE_SEARCH_SUBCATEGORY",
        subcategory
    };
}

export function changeSearchResults(searchResults) {
    return {
        type: "CHANGE_SEARCH_RESULTS",
        searchResults
    };
}
