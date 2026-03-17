import React from "react";

// statuts renvoyes par /api/dashboard (strtolower du status Preuve)
const STATUT_LABELS = {
    valide: "Validé",
    en_attente: "En attente",
};

function cssStatut(statut) {
    return statut.replace("_", "-");
}

export default function DefisRecents({ defis }) {
    return (
        <div className="defis-recents">
            <h2>Mes défis récents</h2>
            <div className="list">
                {defis.length === 0 ? (
                    <p className="empty">Aucun defi en cours.</p>
                ) : (
                    defis.map((defi) => (
                        <div key={defi.id} className={`defi-card ${cssStatut(defi.statut)}`}>
                            <div className="header">
                                <span className="titre">{defi.titre}</span>
                                <span className={`statut ${cssStatut(defi.statut)}`}>
                                    {STATUT_LABELS[defi.statut] || defi.statut}
                                </span>
                            </div>
                            <span className="date">{defi.date}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
