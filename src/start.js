import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import FirstPage from "./FirstPage";
// import Homepage from "./Homepage";
// import { BrowserRouter } from "react-router-dom";
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

// const elem = (store,
// (
//     <Provider store={store}>
//         <BrowserRouter>
//             <Homepage />
//         </BrowserRouter>
//     </Provider>
// ));

// if (location.pathname == "/welcome") {
//     ReactDOM.render(<FirstPage />, mainElement);
// } else {
//     ReactDOM.render(elem, mainElement);
// }

const mainElement = document.querySelector("main");

ReactDOM.render(elem, mainElement);
