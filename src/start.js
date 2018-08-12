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

const store = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const elem = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Registration} />
                <Route component={FirstPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

const mainElement = document.querySelector("main");

ReactDOM.render(elem, mainElement);
