import React from "react";
import { mockUser, mockEquipe, mockDefis, mockScores } from "../../mockData";
import EquipeResume from "./EquipeResume";
import DefisRecents from "./DefisRecents";
import DerniersScores from "./DerniersScores";
import "./Dashboard.scss";

export default function Dashboard() {
    // TODO: remplacer par fetch API quand le back sera branche
    const user = mockUser;
    const equipe = mockEquipe;
    const defis = mockDefis;
    const scores = mockScores;

    const defisValides = defis.filter((d) => d.statut === "valide").length;

    return (
        <div className="dashboard">
            {/* hero gradient avec stats rapides */}
            <div className="dashboard__hero">
                <div className="dashboard__hero-text">
                    <h1>Bonjour, {user.nom.split(" ")[0]} !</h1>
                    <p>Pret a relever de nouveaux defis eco ?</p>
                </div>
                <div className="dashboard__hero-stats">
                    <div className="dashboard__hero-stat">
                        <span className="dashboard__hero-stat-value">{user.scoreTotal}</span>
                        <span className="dashboard__hero-stat-label">points</span>
                    </div>
                    <div className="dashboard__hero-stat">
                        <span className="dashboard__hero-stat-value">{user.totalCO2}</span>
                        <span className="dashboard__hero-stat-label">kg CO2 economises</span>
                    </div>
                    <div className="dashboard__hero-stat">
                        <span className="dashboard__hero-stat-value">{defisValides}/{defis.length}</span>
                        <span className="dashboard__hero-stat-label">defis completes</span>
                    </div>
                </div>
            </div>

            {/* contenu principal : defis + sidebar */}
            <div className="dashboard__content">
                <DefisRecents defis={defis} />
                <div className="dashboard__sidebar">
                    <EquipeResume equipe={equipe} />
                    <DerniersScores scores={scores} />
                </div>
            </div>
        </div>
    );
}
