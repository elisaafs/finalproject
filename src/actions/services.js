import axios from "../axios";

export async function loadService(id) {
    const { data } = await axios.get(`/service/${id}.json`);
    return {
        type: "LOAD_SERVICES",
        author: data.author_id,
        id: data.id,
        name: data.name,
        contact: data.contact,
        placeId: data.place_id,
        placeDescription: data.place_description,
        homepage: data.homepage,
        language: data.language,
        fluence: data.fluence,
        category: data.category,
        subcategory: data.subcategory,
        description: data.description,
        picture: data.picture || "/default.png"
    };
}

export function setServicePic(picture) {
    return {
        type: "SET_MY_PROFILE_PIC",
        picture
    };
}
