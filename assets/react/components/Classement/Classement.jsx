import React, { useState } from "react";
import { mockUser, mockClassement, mockClassementUsers } from "../../mockData";
import "./Classement.scss";

// podium top 3
const MEDALS = ["🥇", "🥈", "🥉"];

const TABS = [
    { key: "equipes", label: "Équipes" },
    { key: "joueurs", label: "Joueurs" },
];

export default function Classement() {
    const [activeTab, setActiveTab] = useState("equipes");

    // TODO: remplacer par fetch API quand le back sera branché
    const user = mockUser;

    return (
        <div className="classement">
            <div className="classement__header">
                <h1>Classement</h1>
                <p className="classement__subtitle">
                    Comparez vos performances avec les autres joueurs et équipes.
                </p>
            </div>

            <div className="classement__my-rank">
                <div className="classement__my-rank-icon">📊</div>
                <div className="classement__my-rank-info">
                    <span className="classement__my-rank-label">Mon classement</span>
                    <span className="classement__my-rank-position">
                        #{mockClassementUsers.findIndex((u) => u.isMe) + 1}
                    </span>
                </div>
                <div className="classement__my-rank-score">
                    <span className="classement__my-rank-pts">{user.scoreTotal} pts</span>
                </div>
            </div>

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

            {activeTab === "equipes" ? (
                <div className="classement__table">
                    <div className="classement__table-header">
                        <span className="classement__col-rang">#</span>
                        <span className="classement__col-nom">Équipe</span>
                        <span className="classement__col-score">Score</span>
                    </div>
                    {mockClassement.map((entry) => (
                        <div
                            key={entry.position}
                            className={`classement__row ${entry.nom === "Les EcoWarriors" ? "classement__row--me" : ""} ${entry.position <= 3 ? "classement__row--top" : ""}`}
                        >
                            <span className="classement__col-rang">
                                {entry.position <= 3 ? MEDALS[entry.position - 1] : entry.position}
                            </span>
                            <span className="classement__col-nom">
                                {entry.nom}
                                {entry.nom === "Les EcoWarriors" && (
                                    <span className="classement__badge-me">Mon équipe</span>
                                )}
                            </span>
                            <span className="classement__col-score">{entry.score} pts</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="classement__table">
                    <div className="classement__table-header">
                        <span className="classement__col-rang">#</span>
                        <span className="classement__col-nom">Joueur</span>
                        <span className="classement__col-score">Score</span>
                    </div>
                    {mockClassementUsers.map((entry) => (
                        <div
                            key={entry.rang}
                            className={`classement__row ${entry.isMe ? "classement__row--me" : ""} ${entry.rang <= 3 ? "classement__row--top" : ""}`}
                        >
                            <span className="classement__col-rang">
                                {entry.rang <= 3 ? MEDALS[entry.rang - 1] : entry.rang}
                            </span>
                            <span className="classement__col-nom">
                                {entry.nom}
                                {entry.isMe && <span className="classement__badge-me">Moi</span>}
                            </span>
                            <span className="classement__col-score">{entry.points} pts</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
