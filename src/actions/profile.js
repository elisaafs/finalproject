import axios from "../axios";

export async function loadMyProfile() {
    const { data } = await axios.get("/user");
    return {
        type: "LOAD_MY_PROFILE",
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        profilePic: data.profile_pic || "/default.png",
        email: data.email,
        city: data.city,
        country: data.country,
        languageSpeak: data.language_speak
    };
}

export function setMyProfilePic(profilePic) {
    return {
        type: "SET_MY_PROFILE_PIC",
        profilePic
    };
}
