import React from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);