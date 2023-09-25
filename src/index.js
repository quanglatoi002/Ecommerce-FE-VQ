import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
