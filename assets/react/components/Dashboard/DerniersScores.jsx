import React from "react";

export default function DerniersScores({ scores }) {
    return (
        <div className="derniers-scores">
            <h2>Derniers points gagnés</h2>
            <ul>
                {scores.map((s) => (
                    <li key={s.id}>
                        <div className="info">
                            <span className="motif">{s.motif}</span>
                            <span className="date">{s.dateGain}</span>
                        </div>
                        <span className="gained">+{s.valeur} pts</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
