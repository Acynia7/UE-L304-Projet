import React from "react";

// format API /api/dashboard : equipe = { nom, score, membres (count) }
export default function EquipeResume({ equipe }) {
    return (
        <div className="equipe-resume">
            <h2>Mon équipe : {equipe.nom}</h2>
            <p className="score">Score d'équipe : <strong>{equipe.score} pts</strong></p>
            <p className="membres">{equipe.membres} membre{equipe.membres > 1 ? "s" : ""}</p>
        </div>
    );
}
