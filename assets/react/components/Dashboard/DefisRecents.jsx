import React from "react";

const STATUT_LABELS = {
    valide: "Validé",
    en_cours: "En cours",
    a_faire: "À faire",
};

// convertit "en_cours" en "en-cours" pour les classes css
function cssStatut(statut) {
    return statut.replace("_", "-");
}

export default function DefisRecents({ defis }) {
    return (
        <div className="defis-recents">
            <h2>Mes défis</h2>
            <div className="list">
                {defis.map((defi) => (
                    <div key={defi.id} className={`defi-card ${cssStatut(defi.statut)}`}>
                        <div className="header">
                            <span className="categorie">{defi.categorie}</span>
                            <span className={`statut ${cssStatut(defi.statut)}`}>
                                {STATUT_LABELS[defi.statut]}
                            </span>
                        </div>
                        <h3>{defi.titre}</h3>
                        <p className="description">{defi.description}</p>
                        <div className="footer">
                            <span className="points">{defi.point} pts</span>
                            <span className="co2">-{defi.economieCO2} kg CO2</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
