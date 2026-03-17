import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";

import "./components/_container.scss";
import "./components/_variables.scss";
import "./components/_components.scss";



const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);