import axios from "../axios";

export function changeLanguage(language) {
    return {
        type: "CHANGE_LANGUAGE",
        language
    };
}
