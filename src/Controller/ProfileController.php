<?php

namespace App\Controller;

use App\Repository\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ProfileController extends AbstractController
{
    /**
     * API JSON pour la page Profil (React SPA).
     *
     * Anciennement sur /profile (Twig vide), deplace en /api/profil
     * pour etre consomme par le composant React Profil.
     */
    #[Route('/api/profil', name: 'api_profil', methods: ['GET'])]
    public function index(ScoreRepository $scoreRepository): JsonResponse
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        // infos utilisateur
        $userData = [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'email' => $user->getEmail(),
            'scoreTotal' => $user->getScoreTotal(),
            'totalCO2' => $user->getTotalCO2(),
        ];

        // equipe et ses membres
        $equipe = $user->getEquipe();
        $equipeDt = null;
        if ($equipe) {
            $membres = [];
            foreach ($equipe->getUsers() as $membre) {
                $membres[] = [
                    'id' => $membre->getId(),
                    'nom' => $membre->getNom(),
                    'scoreTotal' => $membre->getScoreTotal(),
                ];
            }
            $equipeDt = [
                'nom' => $equipe->getNom(),
                'scoreEquipe' => $equipe->getScoreEquipe(),
                'codeInvitation' => $equipe->getCodeInvitation(),
                'membres' => $membres,
            ];
        }

        // activite recente (derniers scores)
        $scores = $scoreRepository->findBy(
            ['user' => $user],
            ['dateGain' => 'DESC'],
            10
        );
        $scoresDt = [];
        foreach ($scores as $score) {
            $scoresDt[] = [
                'id' => $score->getId(),
                'motif' => $score->getMotif(),
                'valeur' => $score->getValeur(),
                'dateGain' => $score->getDateGain()->format('d/m/Y'),
            ];
        }

        // nombre de defis valides (via preuves)
        $preuves = $user->getPreuves();
        $defisValides = 0;
        $totalDefis = 0;
        foreach ($preuves as $preuve) {
            $totalDefis++;
            if ($preuve->getStatus() === 'VALIDE') {
                $defisValides++;
            }
        }

        return $this->json([
            'user' => $userData,
            'equipe' => $equipeDt,
            'scores' => $scoresDt,
            'defisValides' => $defisValides,
            'totalDefisParticipes' => $totalDefis,
        ]);
    }
}
