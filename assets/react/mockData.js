// Donnees mock au format exact des reponses API Symfony
// Permet de dev le front sans Docker, remplace par les vrais fetch dans chaque composant

// format /api/dashboard
export const mockDashboardData = {
    user: { nom: "Nathan Saccol", scoreTotal: 1250, totalCO2: 48.5 },
    defis: [
        { id: 1, titre: "Repas végétarien", statut: "valide", date: "07/03/2026" },
        { id: 4, titre: "Douche express", statut: "valide", date: "06/03/2026" },
        { id: 2, titre: "Transport doux", statut: "en_attente", date: "05/03/2026" },
    ],
    totalDefis: 5,
    equipe: { nom: "Les EcoWarriors", score: 4820, membres: 4 },
    scores: [
        { defiTitre: "Repas végétarien", points: 50, date: "07/03" },
        { defiTitre: "Douche express", points: 30, date: "06/03" },
        { defiTitre: "Transport doux", points: 80, date: "05/03" },
    ],
};

// format /api/challenges
export const mockChallengeData = {
    toDo: [
        { id: 3, titre: "Zéro déchet", description: "Ne produire aucun déchet plastique de la journée", points: 100, economieCO2: 3.8, categorie: "Déchets", difficulte: "Difficile" },
        { id: 5, titre: "Éteindre les appareils", description: "Éteindre tous les appareils en veille ce soir", points: 40, economieCO2: 1.8, categorie: "Énergie", difficulte: "Facile" },
    ],
    valid: [
        { id: 1, titre: "Repas végétarien", description: "Manger un repas 100% végétarien aujourd'hui", points: 50, economieCO2: 2.5, categorie: "Alimentation", difficulte: "Facile" },
        { id: 4, titre: "Douche express", description: "Prendre une douche de moins de 5 minutes", points: 30, economieCO2: 1.2, categorie: "Eau", difficulte: "Facile" },
    ],
    pending: [
        { id: 2, titre: "Transport doux", description: "Se déplacer uniquement à pied ou à vélo aujourd'hui", points: 80, economieCO2: 4.2, categorie: "Transport", difficulte: "Moyen" },
    ],
};

// format /api/leaderboard
export const mockLeaderboardData = {
    usersRank: [
        { rang: 1, nom: "Aurélien Piotte", points: 1340, isMe: false },
        { rang: 2, nom: "Nathan Saccol", points: 1250, isMe: true },
        { rang: 3, nom: "Safiya Jaouahir", points: 1180, isMe: false },
        { rang: 4, nom: "Emilie Valentin", points: 1050, isMe: false },
        { rang: 5, nom: "Lucas Martin", points: 980, isMe: false },
        { rang: 6, nom: "Clara Dupont", points: 920, isMe: false },
        { rang: 7, nom: "Hugo Bernard", points: 870, isMe: false },
        { rang: 8, nom: "Léa Moreau", points: 810, isMe: false },
        { rang: 9, nom: "Thomas Petit", points: 750, isMe: false },
        { rang: 10, nom: "Julie Robert", points: 690, isMe: false },
    ],
    equipesRank: [
        { rang: 1, nom: "Les EcoWarriors", points: 4820, isMyTeam: true },
        { rang: 2, nom: "Green Team", points: 4510, isMyTeam: false },
        { rang: 3, nom: "Planet Savers", points: 3980, isMyTeam: false },
        { rang: 4, nom: "Eco Fighters", points: 3720, isMyTeam: false },
        { rang: 5, nom: "Nature First", points: 3450, isMyTeam: false },
        { rang: 6, nom: "Terre Verte", points: 3200, isMyTeam: false },
        { rang: 7, nom: "Les Recycleurs", points: 2980, isMyTeam: false },
        { rang: 8, nom: "Zero Waste", points: 2750, isMyTeam: false },
        { rang: 9, nom: "Climat Action", points: 2500, isMyTeam: false },
        { rang: 10, nom: "Bio Squad", points: 2310, isMyTeam: false },
    ],
    myPersonalRank: 2,
};

// format /api/profile
export const mockProfileData = {
    pseudo: "Nathan Saccol",
    email: "nathan.saccol@etu.unilim.fr",
    equipe: "Les EcoWarriors",
    equipe_id: 1,
    score_total: 1250,
    nb_defis_releves: 3,
};

// badges (pas d'API pour l'instant, front-only)
export const mockBadges = [
    { id: 1, nom: "Premier pas", icon: "🌱", description: "Premier defi valide", obtenu: true },
    { id: 2, nom: "Team player", icon: "🤝", description: "Rejoindre une equipe", obtenu: true },
    { id: 3, nom: "Veggie lover", icon: "🥗", description: "5 defis alimentation", obtenu: true },
    { id: 4, nom: "Eco-warrior", icon: "⚔️", description: "10 defis valides", obtenu: false },
    { id: 5, nom: "Sauveur de CO2", icon: "💨", description: "50 kg de CO2 economises", obtenu: false },
    { id: 6, nom: "Regulier", icon: "🔥", description: "7 jours consecutifs", obtenu: false },
    { id: 7, nom: "Hydro master", icon: "💧", description: "5 defis eau", obtenu: false },
    { id: 8, nom: "Zero carbone", icon: "🏆", description: "100 kg de CO2 economises", obtenu: false },
];
