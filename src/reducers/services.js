export function services(state = {}, action) {
    switch (action.type) {
        case "LOAD_SERVICES":
            return {
                id: action.id,
                name: action.name,
                contact: action.contact,
                picture: action.picture,
                address: action.address,
                language: action.language,
                categorie: action.categorie,
                subcategorie: action.subcategorie,
                fluence: action.fluence,
                homepage: action.homepage,
                city: action.city,
                description: action.description,
                country: action.country
            };

        case "SET_SERVICE_PICTURE":
            return {
                ...state,
                picture: action.picture
            };
    }
    return state;
}
