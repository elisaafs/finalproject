import axios from "../axios";

export async function loadMyServices() {
    const { data } = await axios.get(`/services`);
    return {
        type: "LOADED_MY_SERVICES",
        services: data
    };
}
