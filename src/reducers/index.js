import { combineReducers } from "redux";
import { language } from "./language";
import { me } from "./me";
import { users } from "./opp";
import { services } from "./services";

const mainReducer = combineReducers({
    language,
    me,
    users,
    services
});

export default mainReducer;
