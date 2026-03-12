import React, { useState } from "react";
import { mockUser, mockEquipe, mockDefis } from "../../mockData";
import "./Challenge.scss";

// labels affiches pour chaque statut
const STATUT_LABELS = {
    valide: "Valide",
    en_cours: "En attente",
    a_faire: "A faire",
};

const TABS = [
    { key: "a_faire", label: "A faire", icon: "🎯" },
    { key: "en_cours", label: "En attente", icon: "⏳" },
    { key: "valide", label: "Valides", icon: "✅" },
];

// convertit "en_cours" en "en-cours" pour les classes CSS
function cssStatut(statut) {
    return statut.replace("_", "-");
}

export default function Challenge() {
    const [activeTab, setActiveTab] = useState("a_faire");

    // TODO: remplacer par fetch API quand le back sera branche
    const user = mockUser;
    const equipe = mockEquipe;
    const defis = mockDefis;

    // tri des defis par statut
    const defisByStatut = {
        a_faire: defis.filter((d) => d.statut === "a_faire"),
        en_cours: defis.filter((d) => d.statut === "en_cours"),
        valide: defis.filter((d) => d.statut === "valide"),
    };

    const counts = {
        a_faire: defisByStatut.a_faire.length,
        en_cours: defisByStatut.en_cours.length,
        valide: defisByStatut.valide.length,
    };

    return (
        <div className="challenge">
            {/* hero gradient */}
            <div className="challenge__hero">
                <div className="challenge__hero-text">
                    <h1>Mes defis</h1>
                    <p>Relevez des defis ecologiques et gagnez des points !</p>
                </div>
                <div className="challenge__hero-scores">
                    <div className="challenge__hero-badge">
                        <span className="challenge__hero-badge-value">{user.scoreTotal}</span>
                        <span className="challenge__hero-badge-label">pts perso</span>
                    </div>
                    <div className="challenge__hero-badge">
                        <span className="challenge__hero-badge-value">{equipe.scoreEquipe}</span>
                        <span className="challenge__hero-badge-label">pts equipe</span>
                    </div>
                </div>
            </div>

            {/* onglets de filtrage */}
            <div className="challenge__tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        className={`challenge__tab ${activeTab === tab.key ? "active" : ""} ${cssStatut(tab.key)}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        <span className="challenge__tab-icon">{tab.icon}</span>
                        {tab.label}
                        <span className="challenge__tab-count">{counts[tab.key]}</span>
                    </button>
                ))}
            </div>

            {/* liste des defis */}
            <div className="challenge__list">
                {defisByStatut[activeTab].length === 0 ? (
                    <div className="challenge__empty">
                        <span className="challenge__empty-icon">🌿</span>
                        <p>Aucun defi dans cette categorie.</p>
                    </div>
                ) : (
                    defisByStatut[activeTab].map((defi) => (
                        <div key={defi.id} className={`challenge__card ${cssStatut(defi.statut)}`}>
                            <div className="challenge__card-top">
                                <div className="challenge__card-meta">
                                    <span className="challenge__card-categorie">{defi.categorie}</span>
                                    <span className={`challenge__card-difficulte ${defi.difficulte.toLowerCase()}`}>
                                        {defi.difficulte}
                                    </span>
                                </div>
                                <span className={`challenge__card-statut ${cssStatut(defi.statut)}`}>
                                    {STATUT_LABELS[defi.statut]}
                                </span>
                            </div>
                            <h3 className="challenge__card-titre">{defi.titre}</h3>
                            <p className="challenge__card-desc">{defi.description}</p>
                            <div className="challenge__card-bottom">
                                <div className="challenge__card-rewards">
                                    <span className="challenge__card-points">+{defi.point} pts</span>
                                    <span className="challenge__card-co2">-{defi.economieCO2} kg CO2</span>
                                </div>
                                {defi.statut === "a_faire" && (
                                    <button className="challenge__card-btn">Soumettre une preuve</button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
