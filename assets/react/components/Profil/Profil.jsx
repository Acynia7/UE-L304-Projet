import React, { useState, useEffect } from "react";
import { mockProfileData, mockBadges } from "../../mockData";
import "./Profil.scss";

export default function Profil() {
    const [profile, setProfile] = useState(mockProfileData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const badges = mockBadges; // pas d'API badges pour l'instant

    useEffect(() => {
        fetch("/api/profile", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((apiData) => { if (apiData) setProfile(apiData); })
            .catch(() => setError("Impossible de charger le profil"))
            .finally(() => setLoading(false));
    }, []);

    const badgesObtenus = badges.filter((b) => b.obtenu).length;
    const hasTeam = profile.equipe && profile.equipe !== "Aucune équipe";

    if (loading) return <div className="profil"><p>Chargement...</p></div>;
    if (error) return <div className="profil"><p className="profil__error">{error}</p></div>;

    return (
        <div className="profil">
            {/* header gradient avec avatar et infos */}
            <div className="profil__hero">
                <div className="profil__hero-left">
                    <div className="profil__avatar">
                        {profile.pseudo.charAt(0).toUpperCase()}
                    </div>
                    <div className="profil__hero-info">
                        <h1>{profile.pseudo}</h1>
                        <p className="profil__email">{profile.email}</p>
                        {hasTeam && (
                            <span className="profil__hero-team">{profile.equipe}</span>
                        )}
                    </div>
                </div>

                {/* cercle de score */}
                <div className="profil__score-circle">
                    <span className="profil__score-circle-label">Score total</span>
                    <span className="profil__score-circle-value">{profile.score_total}</span>
                    <span className="profil__score-circle-unit">pts</span>
                </div>
            </div>

            {/* stats en cartes */}
            <div className="profil__stats">
                <div className="profil__stat-card">
                    <span className="profil__stat-icon">🎯</span>
                    <span className="profil__stat-value">{profile.nb_defis_releves}</span>
                    <span className="profil__stat-label">Defis releves</span>
                </div>
                <div className="profil__stat-card">
                    <span className="profil__stat-icon">🏆</span>
                    <span className="profil__stat-value">{profile.score_total}</span>
                    <span className="profil__stat-label">Points total</span>
                </div>
                <div className="profil__stat-card">
                    <span className="profil__stat-icon">👥</span>
                    <span className="profil__stat-value">{hasTeam ? profile.equipe : "-"}</span>
                    <span className="profil__stat-label">Equipe</span>
                </div>
            </div>

            {/* badges et recompenses */}
            <div className="profil__badges-section">
                <h2>Badges ({badgesObtenus}/{badges.length})</h2>
                <div className="profil__badges-grid">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className={`profil__badge ${badge.obtenu ? "profil__badge--obtenu" : "profil__badge--locked"}`}
                        >
                            <span className="profil__badge-icon">{badge.icon}</span>
                            <span className="profil__badge-nom">{badge.nom}</span>
                            <span className="profil__badge-desc">{badge.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* section equipe */}
            <div className="profil__grid">
                <div className="profil__card">
                    <h2>Mon equipe</h2>
                    {hasTeam ? (
                        <div className="profil__team-header">
                            <h3>{profile.equipe}</h3>
                        </div>
                    ) : (
                        <p className="profil__empty">Vous n'etes dans aucune equipe.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
