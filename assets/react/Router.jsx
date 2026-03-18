import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/nav/navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Challenge from "./components/Challenge/Challenge";
import Classement from "./components/Classement/Classement";
import Profil from "./components/Profil/Profil";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import MentionLegales from "./components/Footer/ml";
import Logout from "./components/Logout/Logout";

export default function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/classement" element={<Classement />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/privacy" element={<MentionLegales />} />
                <Route path="/logout" element={<Logout />}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
