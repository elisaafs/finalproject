import { combineReducers } from "redux";
import { language } from "./language";
import { me } from "./profile";
import { users } from "./opp";

const mainReducer = combineReducers({
    language,
    me,
    users
});

export default mainReducer;
