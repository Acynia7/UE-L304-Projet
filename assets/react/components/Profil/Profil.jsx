import React from "react";
import { mockUser, mockEquipe, mockScores, mockDefis } from "../../mockData";
import "./Profil.scss";

export default function Profil() {
    // TODO: remplacer par fetch API quand le back sera branche
    const user = mockUser;
    const equipe = mockEquipe;
    const scores = mockScores;
    const defis = mockDefis;

    const defisValides = defis.filter((d) => d.statut === "valide").length;

    return (
        <div className="profil">
            {/* header gradient avec avatar et infos */}
            <div className="profil__hero">
                <div className="profil__hero-left">
                    <div className="profil__avatar">
                        {user.nom.charAt(0).toUpperCase()}
                    </div>
                    <div className="profil__hero-info">
                        <h1>{user.nom}</h1>
                        <p className="profil__email">{user.email}</p>
                        {equipe && (
                            <span className="profil__hero-team">
                                {equipe.nom}
                            </span>
                        )}
                    </div>
                </div>

                {/* cercle de score (inspire de la maquette) */}
                <div className="profil__score-circle">
                    <span className="profil__score-circle-label">Score total</span>
                    <span className="profil__score-circle-value">{user.scoreTotal}</span>
                    <span className="profil__score-circle-unit">pts</span>
                </div>
            </div>

            {/* stats en cartes */}
            <div className="profil__stats">
                <div className="profil__stat-card">
                    <span className="profil__stat-icon">🌱</span>
                    <span className="profil__stat-value">{user.totalCO2} kg</span>
                    <span className="profil__stat-label">CO2 economises</span>
                </div>
                <div className="profil__stat-card">
                    <span className="profil__stat-icon">🎯</span>
                    <span className="profil__stat-value">{defisValides}/{defis.length}</span>
                    <span className="profil__stat-label">Defis completes</span>
                </div>
                <div className="profil__stat-card">
                    <span className="profil__stat-icon">👥</span>
                    <span className="profil__stat-value">{equipe ? equipe.membres.length : 0}</span>
                    <span className="profil__stat-label">Coequipiers</span>
                </div>
            </div>

            {/* grille equipe + activite */}
            <div className="profil__grid">
                <div className="profil__card">
                    <h2>Mon equipe</h2>
                    {equipe ? (
                        <>
                            <div className="profil__team-header">
                                <h3>{equipe.nom}</h3>
                                <span className="profil__team-score">{equipe.scoreEquipe} pts</span>
                            </div>
                            <div className="profil__team-code">
                                Code d'invitation : <strong>{equipe.codeInvitation}</strong>
                            </div>
                            <ul className="profil__team-members">
                                {equipe.membres.map((m) => (
                                    <li key={m.id}>
                                        <span>{m.nom}</span>
                                        <span className="profil__member-pts">{m.scoreTotal} pts</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="profil__empty">Vous n'etes dans aucune equipe.</p>
                    )}
                </div>

                <div className="profil__card">
                    <h2>Activite recente</h2>
                    {scores.length === 0 ? (
                        <p className="profil__empty">Aucune activite recente.</p>
                    ) : (
                        <ul className="profil__activity-list">
                            {scores.map((s) => (
                                <li key={s.id}>
                                    <div className="profil__activity-info">
                                        <span className="profil__activity-motif">{s.motif}</span>
                                        <span className="profil__activity-date">{s.dateGain}</span>
                                    </div>
                                    <span className="profil__activity-pts">+{s.valeur} pts</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
