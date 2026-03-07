import React from "react";
import { mockUser, mockEquipe, mockDefis, mockScores } from "../../mockData";
import StatCard from "./StatCard";
import EquipeResume from "./EquipeResume";
import DefisRecents from "./DefisRecents";
import DerniersScores from "./DerniersScores";
import "./Dashboard.scss";

export default function Dashboard() {
    const user = mockUser;
    const equipe = mockEquipe;
    const defis = mockDefis;
    const scores = mockScores;

    return (
        <div className="dashboard">
            <h1>Tableau de bord</h1>
            <p className="welcome">Bienvenue, {user.nom} !</p>

            <div className="stats-row">
                <StatCard title="Score total" value={user.scoreTotal} unit="pts" icon="🏆" />
                <StatCard title="CO2 économisé" value={user.totalCO2} unit="kg" icon="🌱" />
                <StatCard title="Défis complétés" value={defis.filter(d => d.statut === "valide").length} unit={"/ " + defis.length} icon="✅" />
                <StatCard title="Rang équipe" value="#1" icon="🥇" />
            </div>

            <div className="content-grid">
                <DefisRecents defis={defis} />
                <div className="sidebar">
                    <EquipeResume equipe={equipe} />
                    <DerniersScores scores={scores} />
                </div>
            </div>
        </div>
    );
}
