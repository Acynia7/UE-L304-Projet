import React from "react";

export default function EquipeResume({ equipe }) {
    return (
        <div className="equipe-resume">
            <h2>Mon équipe : {equipe.nom}</h2>
            <p className="score">Score d'équipe : <strong>{equipe.scoreEquipe} pts</strong></p>
            <h3>Membres</h3>
            <ul>
                {equipe.membres.map((m) => (
                    <li key={m.id}>
                        <span>{m.nom}</span>
                        <span className="pts">{m.scoreTotal} pts</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
