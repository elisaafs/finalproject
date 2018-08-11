const preferredLanguage = window.navigator.languages;
const supportedLanguages = ["en", "de", "pt", "es"];

let match;
preferredLanguage.some(element => {
    const preferredLanguage = element.slice(0, 2).toLowerCase();
    if (supportedLanguages.indexOf(preferredLanguage) >= 0) {
        match = preferredLanguage;
        return true;
    }
});

// fall back to English if no match found
if (!match) {
    match = "en";
}

export function language(state = match, action) {
    switch (action.type) {
        case "CHANGE_LANGUAGE":
            return action.language;
    }

    return state;
}
