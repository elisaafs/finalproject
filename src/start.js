import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import mainReducer from "./reducers/index";
import Login from "./components/Login";
import FirstPage from "./components/FirstPage";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import Opp from "./components/Opp";
import Services from "./components/Services";
import MyServices from "./components/MyServices";
import RegisterService from "./components/RegisterService";
import EditInfosUser from "./components/EditInfosUser";
import ServiceSearch from "./components/ServiceSearch";
import SearchResults from "./components/SearchResults";
import { loadMyProfile } from "./actions/profile";

const store = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

loadMyProfile().then(loadProfileAction => {
    if (loadProfileAction) {
        store.dispatch(loadProfileAction);
    }

    const elem = (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/profile" component={Profile} />
                    <Route
                        exact
                        path="/editprofile"
                        component={EditInfosUser}
                    />
                    <Route path="/user/:id" component={Opp} />
                    <Route path="/service/:id" component={Services} />
                    <Route
                        exact
                        path="/myservices"
                        render={() => <SearchResults useMyServices={true} />}
                    />
                    <Route
                        exact
                        path="/registration-service"
                        component={RegisterService}
                    />
                    <Route exact path="/search" component={ServiceSearch} />
                    <Route
                        exact
                        path="/search-results"
                        render={() => <SearchResults useMyServices={false} />}
                    />
                    <Route path="/:page" component={FirstPage} />
                    <Route component={FirstPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );

    const mainElement = document.querySelector("main");

    ReactDOM.render(elem, mainElement);
});
