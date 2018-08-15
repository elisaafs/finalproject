import { combineReducers } from "redux";
import { language } from "./language";
import { me } from "./me";
import { users } from "./opp";
import { reviews } from "./reviews";
import { services } from "./services";
import { serviceSearch } from "./serviceSearch";

const mainReducer = combineReducers({
    language,
    me,
    users,
    services,
    serviceSearch,
    reviews
});

export default mainReducer;
