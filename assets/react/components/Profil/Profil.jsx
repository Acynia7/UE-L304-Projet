import React from "react";
import { mockUser, mockEquipe, mockScores, mockDefis } from "../../mockData";
import StatCard from "../Dashboard/StatCard";
import "./Profil.scss";

export default function Profil() {
    // TODO: remplacer par fetch API quand le back sera branché
    const user = mockUser;
    const equipe = mockEquipe;
    const scores = mockScores;
    const defis = mockDefis;

    const defisValides = defis.filter((d) => d.statut === "valide").length;

    return (
        <div className="profil">
            <div className="profil__header">
                <div className="profil__avatar">
                    {user.nom.charAt(0).toUpperCase()}
                </div>
                <div className="profil__info">
                    <h1>{user.nom}</h1>
                    <p className="profil__email">{user.email}</p>
                </div>
            </div>

            <div className="profil__stats">
                <StatCard title="Score total" value={user.scoreTotal} unit="pts" icon="🏆" />
                <StatCard title="CO2 économisé" value={user.totalCO2} unit="kg" icon="🌱" />
                <StatCard title="Défis complétés" value={defisValides} unit={"/ " + defis.length} icon="✅" />
            </div>

            <div className="profil__grid">
                <div className="profil__section">
                    <h2>Mon équipe</h2>
                    {equipe ? (
                        <div className="profil__team-card">
                            <div className="profil__team-header">
                                <h3>{equipe.nom}</h3>
                                <span className="profil__team-score">{equipe.scoreEquipe} pts</span>
                            </div>
                            <div className="profil__team-code">
                                Code d'invitation : <strong>{equipe.codeInvitation}</strong>
                            </div>
                            <div className="profil__team-members">
                                <h4>Membres ({equipe.membres.length})</h4>
                                <ul>
                                    {equipe.membres.map((m) => (
                                        <li key={m.id}>
                                            <span>{m.nom}</span>
                                            <span className="profil__member-pts">{m.scoreTotal} pts</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className="profil__no-team">
                            Vous n'êtes dans aucune équipe.
                        </p>
                    )}
                </div>

                <div className="profil__section">
                    <h2>Activité récente</h2>
                    <div className="profil__activity">
                        {scores.length === 0 ? (
                            <p className="profil__no-activity">Aucune activité récente.</p>
                        ) : (
                            <ul>
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
        </div>
    );
}
