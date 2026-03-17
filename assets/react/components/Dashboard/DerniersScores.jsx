import React from "react";

// format API /api/dashboard : scores = [{ defiTitre, points, date }]
export default function DerniersScores({ scores }) {
    return (
        <div className="derniers-scores">
            <h2>Derniers points gagnés</h2>
            {scores.length === 0 ? (
                <p className="empty">Aucun point gagné pour l'instant.</p>
            ) : (
                <ul>
                    {scores.map((s, i) => (
                        <li key={i}>
                            <div className="info">
                                <span className="motif">{s.defiTitre}</span>
                                <span className="date">{s.date}</span>
                            </div>
                            <span className="gained">+{s.points} pts</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
