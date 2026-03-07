import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Challenge from "./components/Challenge/Challenge";
import Classement from "./components/Classement/Classement";
import Profil from "./components/Profil/Profil";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/classement" element={<Classement />} />
                <Route path="/profil" element={<Profil />} />
            </Routes>
        </BrowserRouter>
    );
}
