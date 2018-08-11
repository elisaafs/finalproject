import axios from "../axios";

export async function editService(serviceId, servicePicture, newInfosService) {
    return {
        type: "LOAD_SERVICES",
        id: serviceId,
        firstName: newInfosService.firstName,
        lastName: newInfosService.lastName,
        profilePic: servicePicture,
        email: newInfosService.email,
        country: newInfosService.bio,
        city: newInfosService.city,
        languageSpeak: newInfosService.languageSpeak
    };
}
