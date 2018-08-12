import axios from "../axios";

export async function loadService(id) {
    const { data } = await axios.get(`/service/(${id})`);
    return {
        type: "LOAD_SERVICES",
        id: data.id,
        name: data.name,
        contact: data.contact,
        address: data.address,
        city: data.city,
        country: data.country,
        language: data.language,
        fluence: data.fluence,
        categorie: data.categorie,
        subcategorie: data.subcategorie,
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
