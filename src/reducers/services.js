export function services(state = {}, action) {
    switch (action.type) {
        case "LOAD_SERVICES":
            return {
                id: action.id,
                name: action.name,
                placeId: action.place_id,
                placeDescription: action.place_description,
                contact: action.contact,
                picture: action.picture,
                address: action.address,
                language: action.language,
                category: action.category,
                subcategory: action.subcategory,
                fluence: action.fluence,
                author: action.author_id,
                homepage: action.homepage,
                description: action.description
            };

        case "SET_SERVICE_PICTURE":
            return {
                ...state,
                picture: action.picture
            };
    }
    return state;
}
