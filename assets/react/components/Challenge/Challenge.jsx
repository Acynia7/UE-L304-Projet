import React, { useState, useEffect, useRef } from "react";
import { mockChallengeData } from "../../mockData";
import "./Challenge.scss";

const STATUT_LABELS = {
    a_faire: "A faire",
    en_cours: "En attente",
    valide: "Valides",
};

const TABS = [
    { key: "a_faire", label: "A faire", icon: "🎯" },
    { key: "en_cours", label: "En attente", icon: "⏳" },
    { key: "valide", label: "Valides", icon: "✅" },
];

function cssStatut(statut) {
    return statut.replace("_", "-");
}

// transforme la reponse API { toDo, valid, pending } en tableau unifie avec statut
function flattenDefis(apiData) {
    return [
        ...(apiData.toDo || []).map((d) => ({ ...d, statut: "a_faire" })),
        ...(apiData.pending || []).map((d) => ({ ...d, statut: "en_cours" })),
        ...(apiData.valid || []).map((d) => ({ ...d, statut: "valide" })),
    ];
}

export default function Challenge() {
    const [activeTab, setActiveTab] = useState("a_faire");
    const [activeCategorie, setActiveCategorie] = useState("all");
    const [defis, setDefis] = useState(flattenDefis(mockChallengeData));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploadingId, setUploadingId] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/challenges")
            .then((res) => (res.ok ? res.json() : null))
            .then((apiData) => { 
                if (apiData) setDefis(flattenDefis(apiData)); 
            })
            .catch(() => setError("Impossible de charger les défis"))
            .finally(() => setLoading(false));
    }, []);

    const triggerFileInput = (challengeId) => {
        setUploadingId(challengeId);
        fileInputRef.current.click();
    };
    const categories = ["all", ...new Set(defis.map((d) => d.categorie).filter(Boolean))];

    const defisFiltres = defis
        .filter((d) => d.statut === activeTab)
        .filter((d) => activeCategorie === "all" || d.categorie === activeCategorie);

    const countsByStatut = {
        a_faire: defis.filter((d) => d.statut === "a_faire").length,
        en_cours: defis.filter((d) => d.statut === "en_cours").length,
        valide: defis.filter((d) => d.statut === "valide").length,
    };

    // pour charger une image
    const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !uploadingId) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/challenges/submit/${uploadingId}`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Preuve envoyée !");
            
            // --- AJOUT ICI : On rafraîchit la liste pour déplacer le défi ---
            fetch("http://127.0.0.1:8000/api/challenges")
                .then((res) => res.json())
                .then((apiData) => {
                    setDefis(flattenDefis(apiData));
                    // On change d'onglet automatiquement pour montrer que c'est en attente
                    setActiveTab("en_cours"); 
                });
                
        } else {
            alert("Erreur lors de l'envoi");
        }
    } catch (err) {
        alert("Erreur réseau");
    } finally {
        setUploadingId(null);
        if (e.target) e.target.value = null;
    }
};

    if (loading) return <div className="challenge"><p>Chargement...</p></div>;
    if (error) return <div className="challenge"><p className="challenge__error">{error}</p></div>;

    return (
        <div className="challenge">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
            />
            {/* hero gradient */}
            <div className="challenge__hero">
                <div className="challenge__hero-text">
                    <h1>Mes defis</h1>
                    <p>Relevez des defis ecologiques et gagnez des points !</p>
                </div>
                <div className="challenge__hero-scores">
                    <div className="challenge__hero-badge">
                        <span className="challenge__hero-badge-value">{defis.length}</span>
                        <span className="challenge__hero-badge-label">defis total</span>
                    </div>
                    <div className="challenge__hero-badge">
                        <span className="challenge__hero-badge-value">{countsByStatut.valide}</span>
                        <span className="challenge__hero-badge-label">valides</span>
                    </div>
                </div>
            </div>

            {/* onglets de filtrage par statut */}
            <div className="challenge__tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        className={`challenge__tab ${activeTab === tab.key ? "active" : ""} ${cssStatut(tab.key)}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        <span className="challenge__tab-icon">{tab.icon}</span>
                        {tab.label}
                        <span className="challenge__tab-count">{countsByStatut[tab.key]}</span>
                    </button>
                ))}
            </div>

            {/* filtres par categorie */}
            <div className="challenge__categories">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`challenge__cat-chip ${activeCategorie === cat ? "active" : ""}`}
                        onClick={() => setActiveCategorie(cat)}
                    >
                        {cat === "all" ? "Toutes" : cat}
                    </button>
                ))}
            </div>

            {/* liste des defis */}
            <div className="challenge__list">
                {defisFiltres.length === 0 ? (
                    <div className="challenge__empty">
                        <span className="challenge__empty-icon">🌿</span>
                        <p>Aucun defi dans cette categorie.</p>
                    </div>
                ) : (
                    defisFiltres.map((defi) => (
                        <div key={defi.id} className={`challenge__card ${cssStatut(defi.statut)}`}>
                            <div className="challenge__card-top">
                                <div className="challenge__card-meta">
                                    {defi.categorie && <span className="challenge__card-categorie">{defi.categorie}</span>}
                                    {defi.difficulte && (
                                        <span className={`challenge__card-difficulte ${defi.difficulte.toLowerCase()}`}>
                                            {defi.difficulte}
                                        </span>
                                    )}
                                </div>
                                <span className={`challenge__card-statut ${cssStatut(defi.statut)}`}>
                                    {STATUT_LABELS[defi.statut]}
                                </span>
                            </div>
                            <h3 className="challenge__card-titre">{defi.titre}</h3>
                            <p className="challenge__card-desc">{defi.description}</p>
                            <div className="challenge__card-bottom">
                                <div className="challenge__card-rewards">
                                    <span className="challenge__card-points">+{defi.points} pts</span>
                                    {defi.economieCO2 && <span className="challenge__card-co2">-{defi.economieCO2} kg CO2</span>}
                                </div>
                                {/* Action : Upload de preuve si "A faire" */}
                                {defi.statut === "a_faire" && (
                                <button 
                                    className="challenge__card-btn"
                                    onClick={() => triggerFileInput(defi.id)}
                                    disabled={uploadingId === defi.id}
                                >
                                    {uploadingId === defi.id ? "Envoi..." : "Soumettre une preuve"}
                                </button>
                            )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
