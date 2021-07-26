import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./containers/App"
import store from "./store/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { useState, createContext } from "react"

export const UserContext = createContext();

const Root = () => {
    const [user, setUser] = useState({});

    return (
        <Provider store={store}>
            <UserContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </UserContext.Provider>
        </Provider>
    )
}

export default ReactDOM.render(<Root />, document.getElementById("root"));


//ReactDOM.render(
//    <Provider store={store}>
//        <BrowserRouter>
//            <App />
//        </BrowserRouter>
//    </Provider>,
//  document.getElementById("root")
//);

