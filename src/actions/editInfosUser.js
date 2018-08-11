import axios from "../axios";

export async function editProfile(myUserId, myProfilePic, newProfile) {
    return {
        type: "LOAD_MY_PROFILE",
        id: myUserId,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        profilePic: myProfilePic,
        email: newProfile.email,
        country: newProfile.bio,
        city: newProfile.city,
        languageSpeak: newProfile.languageSpeak
    };
}
