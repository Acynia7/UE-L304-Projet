import React, { useState, useEffect } from "react";
import { mockDashboardData } from "../../mockData";
import EquipeResume from "./EquipeResume";
import DefisRecents from "./DefisRecents";
import DerniersScores from "./DerniersScores";
import "./Dashboard.scss";

function getMotivation(pct) {
    if (pct === 100) return "Tous les defis sont completes, bravo ! 🎉";
    if (pct >= 60) return "Beau parcours, continue comme ca ! 💪";
    if (pct >= 30) return "Bon debut, encore quelques defis a relever !";
    return "C'est le moment de passer a l'action ! 🚀";
}

export default function Dashboard() {
    const [data, setData] = useState(mockDashboardData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((res) => (res.ok ? res.json() : null))
            .then((apiData) => { if (apiData) setData(apiData); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const { user, defis, totalDefis, equipe, scores } = data;

    const defisValides = defis.filter((d) => d.statut === "valide").length;
    const pctComplete = totalDefis > 0 ? Math.round((defisValides / totalDefis) * 100) : 0;

    if (loading) return <div className="dashboard"><p>Chargement...</p></div>;

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
                        <span className="dashboard__hero-stat-value">{defisValides}/{totalDefis}</span>
                        <span className="dashboard__hero-stat-label">defis completes</span>
                    </div>
                </div>
            </div>

            {/* barre de progression */}
            <div className="dashboard__progress">
                <div className="dashboard__progress-header">
                    <span className="dashboard__progress-title">Progression des defis</span>
                    <span className="dashboard__progress-pct">{pctComplete}%</span>
                </div>
                <div className="dashboard__progress-bar">
                    <div
                        className="dashboard__progress-fill"
                        style={{ width: `${pctComplete}%` }}
                    />
                </div>
                <p className="dashboard__progress-msg">{getMotivation(pctComplete)}</p>
            </div>

            {/* contenu principal : defis + sidebar */}
            <div className="dashboard__content">
                <DefisRecents defis={defis} />
                <div className="dashboard__sidebar">
                    {equipe && <EquipeResume equipe={equipe} />}
                    <DerniersScores scores={scores} />
                </div>
            </div>
        </div>
    );
}
