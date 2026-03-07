// mock data (a remplacer par les appels API)

export const mockUser = {
    id: 1,
    nom: "Nathan Saccol",
    email: "nathan.saccol@etu.unilim.fr",
    scoreTotal: 1250,
    totalCO2: 48.5,
    role: "ROLE_USER",
};

export const mockEquipe = {
    id: 1,
    nom: "Les EcoWarriors",
    scoreEquipe: 4820,
    codeInvitation: "ECO-2026",
    membres: [
        { id: 1, nom: "Nathan Saccol", scoreTotal: 1250 },
        { id: 2, nom: "Aurélien Piotte", scoreTotal: 1340 },
        { id: 3, nom: "Safiya Jaouahir", scoreTotal: 1180 },
        { id: 4, nom: "Emilie Valentin", scoreTotal: 1050 },
    ],
};

export const mockDefis = [
    {
        id: 1,
        titre: "Repas végétarien",
        description: "Manger un repas 100% végétarien aujourd'hui",
        point: 50,
        economieCO2: 2.5,
        categorie: "Alimentation",
        difficulte: "Facile",
        statut: "valide",
    },
    {
        id: 2,
        titre: "Transport doux",
        description: "Se déplacer uniquement à pied ou à vélo aujourd'hui",
        point: 80,
        economieCO2: 4.2,
        categorie: "Transport",
        difficulte: "Moyen",
        statut: "en_cours",
    },
    {
        id: 3,
        titre: "Zéro déchet",
        description: "Ne produire aucun déchet plastique de la journée",
        point: 100,
        economieCO2: 3.8,
        categorie: "Déchets",
        difficulte: "Difficile",
        statut: "a_faire",
    },
    {
        id: 4,
        titre: "Douche express",
        description: "Prendre une douche de moins de 5 minutes",
        point: 30,
        economieCO2: 1.2,
        categorie: "Eau",
        difficulte: "Facile",
        statut: "valide",
    },
    {
        id: 5,
        titre: "Éteindre les appareils",
        description: "Éteindre tous les appareils en veille ce soir",
        point: 40,
        economieCO2: 1.8,
        categorie: "Énergie",
        difficulte: "Facile",
        statut: "a_faire",
    },
];

export const mockScores = [
    { id: 1, valeur: 50, motif: "Repas végétarien", dateGain: "2026-03-07" },
    { id: 2, valeur: 30, motif: "Douche express", dateGain: "2026-03-06" },
    { id: 3, valeur: 80, motif: "Transport doux", dateGain: "2026-03-05" },
];

export const mockClassement = [
    { position: 1, nom: "Les EcoWarriors", score: 4820 },
    { position: 2, nom: "Green Team", score: 4510 },
    { position: 3, nom: "Planet Savers", score: 3980 },
    { position: 4, nom: "Eco Fighters", score: 3720 },
    { position: 5, nom: "Nature First", score: 3450 },
];
