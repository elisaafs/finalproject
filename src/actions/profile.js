import axios from "../axios";

export async function loadMyProfile() {
    try {
        const { data } = await axios.get("/user");
        console.log("data", data);
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
    } catch (err) {
        return undefined;
    }
}

export function setMyProfilePic(profilePic) {
    return {
        type: "SET_MY_PROFILE_PIC",
        profilePic
    };
}
