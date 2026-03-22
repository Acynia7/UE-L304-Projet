import React, { useState, useEffect } from "react";
import { mockLeaderboardData } from "../../mockData";
import "./Classement.scss";

const TABS = [
    { key: "equipes", label: "Equipes" },
    { key: "joueurs", label: "Joueurs" },
];

// podium top 3 avec medailles
const MEDALS = ["🥇", "🥈", "🥉"];
const PODIUM_ORDER = [1, 0, 2]; // affichage: 2e, 1er, 3e (le 1er au centre)

function PodiumItem({ entry, rank }) {
    const isFirst = rank === 0;
    return (
        <div className={`classement__podium-item ${isFirst ? "classement__podium-item--first" : ""}`}>
            <div className={`classement__podium-avatar ${isFirst ? "classement__podium-avatar--first" : ""}`}>
                {MEDALS[rank]}
            </div>
            <span className="classement__podium-name">{entry.nom}</span>
            <span className="classement__podium-score">{entry.points} pts</span>
            <div className={`classement__podium-bar classement__podium-bar--${rank + 1}`} />
        </div>
    );
}

export default function Classement() {
    const [activeTab, setActiveTab] = useState("equipes");
    const [data, setData] = useState(mockLeaderboardData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/leaderboard", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((apiData) => { if (apiData) setData(apiData); })
            .catch(() => setError("Impossible de charger le classement"))
            .finally(() => setLoading(false));
    }, []);

    const { usersRank, equipesRank, myPersonalRank } = data;

    const currentData = activeTab === "equipes" ? equipesRank : usersRank;
    const isTeam = activeTab === "equipes";

    // top 3 pour le podium, reste pour le tableau
    const top3 = currentData.slice(0, 3);
    const rest = currentData.slice(3);

    // calcul progression vers le rang suivant
    const me = usersRank.find((u) => u.isMe);
    const mePoints = me?.points || 0;
    const meIdx = usersRank.findIndex((u) => u.isMe);
    const nextPlayer = meIdx > 0 ? usersRank[meIdx - 1] : null;
    const pointsToNext = nextPlayer ? nextPlayer.points - mePoints : 0;

    if (loading) return <div className="classement"><p>Chargement...</p></div>;
    if (error) return <div className="classement"><p className="classement__error">{error}</p></div>;

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
                    <span className="classement__hero-rank-value">#{myPersonalRank}</span>
                    <span className="classement__hero-rank-pts">{mePoints} pts</span>
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
                    />
                ))}
            </div>

            {/* tableau du reste */}
            {rest.length > 0 && (
                <div className="classement__table">
                    {rest.map((entry) => {
                        const isMe = isTeam ? entry.isMyTeam : entry.isMe;

                        return (
                            <div
                                key={entry.rang}
                                className={`classement__row ${isMe ? "classement__row--me" : ""}`}
                            >
                                <span className="classement__row-rang">{entry.rang}</span>
                                <span className="classement__row-nom">
                                    {entry.nom}
                                    {isMe && <span className="classement__row-badge">{isTeam ? "Mon equipe" : "Moi"}</span>}
                                </span>
                                <span className="classement__row-score">{entry.points} pts</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
