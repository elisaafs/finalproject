export function myServices(state = null, action) {
    switch (action.type) {
        case "LOADED_MY_SERVICES":
            return action.services;
    }

    return state;
}
