import axios from "../axios";

export async function editService(serviceId, servicePicture, newInfosService) {
    return {
        type: "LOAD_SERVICES",
        id: serviceId,
        name: newInfosService.name,
        contact: newInfosService.contact,
        address: newInfosService.address,
        city: newInfosService.city,
        country: newInfosService.country,
        language: newInfosService.language,
        fluence: newInfosService.fluence,
        categorie: newInfosService.categorie,
        subcategorie: newInfosService.subcategorie,
        description: newInfosService.description,
        picture: servicePicture
    };
}
