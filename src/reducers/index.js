import { combineReducers } from "redux";
import { language } from "./language";
import { me } from "./me";
import { users } from "./opp";
import { reviews } from "./reviews";
import { serviceSearch } from "./serviceSearch";
import { myServices } from "./myServices";

const mainReducer = combineReducers({
    language,
    me,
    myServices,
    users,
    serviceSearch,
    reviews
});

export default mainReducer;
