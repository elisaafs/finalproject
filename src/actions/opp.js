import axios from "../axios";

export async function loadUser(userId) {
    const { data } = await axios.get(`/otheruser/${userId}`);
    return {
        type: "USER_LOADED",
        userId,
        userInformation: data
    };
}
