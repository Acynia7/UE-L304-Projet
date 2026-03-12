import React, { useState } from "react";
import { mockUser, mockEquipe, mockDefis } from "../../mockData";
import "./Challenge.scss";

// labels affichés pour chaque statut
const STATUT_LABELS = {
    valide: "Validé",
    en_cours: "En attente",
    a_faire: "À faire",
};

const TABS = [
    { key: "a_faire", label: "À faire" },
    { key: "en_cours", label: "En attente" },
    { key: "valide", label: "Validés" },
];

// convertit "en_cours" en "en-cours" pour les classes CSS
function cssStatut(statut) {
    return statut.replace("_", "-");
}

export default function Challenge() {
    const [activeTab, setActiveTab] = useState("a_faire");

    // TODO: remplacer par fetch API quand le back sera branché
    const user = mockUser;
    const equipe = mockEquipe;
    const defis = mockDefis;

    // tri des défis par statut
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
            <div className="challenge__header">
                <div>
                    <h1>Mes défis</h1>
                    <p className="challenge__subtitle">
                        Relevez des défis écologiques et gagnez des points !
                    </p>
                </div>
                <div className="challenge__scores">
                    <div className="challenge__score-badge">
                        <span className="challenge__score-value">{user.scoreTotal}</span>
                        <span className="challenge__score-label">pts perso</span>
                    </div>
                    <div className="challenge__score-badge challenge__score-badge--team">
                        <span className="challenge__score-value">{equipe.scoreEquipe}</span>
                        <span className="challenge__score-label">pts équipe</span>
                    </div>
                </div>
            </div>

            <div className="challenge__tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        className={`challenge__tab ${activeTab === tab.key ? "active" : ""} ${cssStatut(tab.key)}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                        <span className="challenge__tab-count">{counts[tab.key]}</span>
                    </button>
                ))}
            </div>

            <div className="challenge__list">
                {defisByStatut[activeTab].length === 0 ? (
                    <p className="challenge__empty">Aucun défi dans cette catégorie.</p>
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
                                    <span className="challenge__card-points">{defi.point} pts</span>
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
