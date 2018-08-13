import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import FirstPage from "./FirstPage";
import mainReducer from "./reducers/index";
import Login from "./Login";
import Registration from "./Registration";
import Profile from "./Profile";
import Opp from "./Opp";
import RegisterService from "./RegisterService";
import EditInfosUser from "./EditInfosUser";
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
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Registration} />
                    <Route exact path="/profile" component={Profile} />
                    <Route
                        exact
                        path="/editprofile"
                        component={EditInfosUser}
                    />
                    <Route
                        path="/user/:id"
                        render={props => (
                            <Opp match={props.match} history={props.history} />
                        )}
                    />
                    <Route
                        exact
                        path="/registration-service"
                        component={RegisterService}
                    />
                    <Route component={FirstPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );

    const mainElement = document.querySelector("main");

    ReactDOM.render(elem, mainElement);
});
