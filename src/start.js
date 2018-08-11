import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import FirstPage from "./FirstPage";
import mainReducer from "./reducers/index";

const store = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

const elem = (
    <Provider store={store}>
        <FirstPage />
    </Provider>
);

const mainElement = document.querySelector("main");

ReactDOM.render(elem, mainElement);
