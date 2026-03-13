import React, { useState } from "react";
import { mockUser, mockClassement, mockClassementUsers } from "../../mockData";
import "./Classement.scss";

const TABS = [
    { key: "equipes", label: "Equipes" },
    { key: "joueurs", label: "Joueurs" },
];

// podium top 3 avec medailles
const MEDALS = ["🥇", "🥈", "🥉"];
const PODIUM_ORDER = [1, 0, 2]; // affichage: 2e, 1er, 3e (le 1er au centre)

function PodiumItem({ entry, rank, isTeam }) {
    const isFirst = rank === 0;
    return (
        <div className={`classement__podium-item ${isFirst ? "classement__podium-item--first" : ""}`}>
            <div className={`classement__podium-avatar ${isFirst ? "classement__podium-avatar--first" : ""}`}>
                {MEDALS[rank]}
            </div>
            <span className="classement__podium-name">{entry.nom}</span>
            <span className="classement__podium-score">
                {isTeam ? entry.score : entry.points} pts
            </span>
            <div className={`classement__podium-bar classement__podium-bar--${rank + 1}`} />
        </div>
    );
}

export default function Classement() {
    const [activeTab, setActiveTab] = useState("equipes");

    // TODO: remplacer par fetch API quand le back sera branche
    const user = mockUser;
    const monRang = mockClassementUsers.findIndex((u) => u.isMe) + 1;

    const currentData = activeTab === "equipes" ? mockClassement : mockClassementUsers;
    const isTeam = activeTab === "equipes";

    // top 3 pour le podium, reste pour le tableau
    const top3 = currentData.slice(0, 3);
    const rest = currentData.slice(3);

    // calcul progression vers le rang suivant
    const meIdx = mockClassementUsers.findIndex((u) => u.isMe);
    const mePoints = mockClassementUsers[meIdx]?.points || 0;
    const nextPlayer = meIdx > 0 ? mockClassementUsers[meIdx - 1] : null;
    const pointsToNext = nextPlayer ? nextPlayer.points - mePoints : 0;

    return (
        <div className="classement">
            {/* hero gradient avec rang perso */}
            <div className="classement__hero">
                <div className="classement__hero-text">
                    <h1>Classement</h1>
                    <p>Comparez vos performances avec les autres.</p>
                </div>
                <div className="classement__hero-rank">
                    <span className="classement__hero-rank-label">Mon rang</span>
                    <span className="classement__hero-rank-value">#{monRang}</span>
                    <span className="classement__hero-rank-pts">{user.scoreTotal} pts</span>
                </div>
            </div>

            {/* progression vers le rang suivant */}
            {nextPlayer && (
                <div className="classement__next-rank">
                    <div className="classement__next-rank-header">
                        <span>🎯 Plus que <strong>{pointsToNext} pts</strong> pour depasser <strong>{nextPlayer.nom}</strong></span>
                    </div>
                    <div className="classement__next-rank-bar">
                        <div
                            className="classement__next-rank-fill"
                            style={{ width: `${Math.round((mePoints / nextPlayer.points) * 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* onglets equipes / joueurs */}
            <div className="classement__tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        className={`classement__tab ${activeTab === tab.key ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* podium top 3 */}
            <div className="classement__podium">
                {PODIUM_ORDER.map((idx) => (
                    <PodiumItem
                        key={idx}
                        entry={top3[idx]}
                        rank={idx}
                        isTeam={isTeam}
                    />
                ))}
            </div>

            {/* tableau du reste */}
            {rest.length > 0 && (
                <div className="classement__table">
                    {rest.map((entry) => {
                        const rank = isTeam ? entry.position : entry.rang;
                        const score = isTeam ? entry.score : entry.points;
                        const isMe = isTeam
                            ? entry.nom === "Les EcoWarriors"
                            : entry.isMe;

                        return (
                            <div
                                key={rank}
                                className={`classement__row ${isMe ? "classement__row--me" : ""}`}
                            >
                                <span className="classement__row-rang">{rank}</span>
                                <span className="classement__row-nom">
                                    {entry.nom}
                                    {isMe && <span className="classement__row-badge">{isTeam ? "Mon equipe" : "Moi"}</span>}
                                </span>
                                <span className="classement__row-score">{score} pts</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
