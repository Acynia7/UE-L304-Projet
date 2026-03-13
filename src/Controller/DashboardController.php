<?php

namespace App\Controller;

use App\Repository\DefiRepository;
use App\Repository\PreuveRepository;
use App\Repository\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class DashboardController extends AbstractController
{
    /**
     * API JSON pour la page Dashboard (React SPA).
     *
     * Anciennement sur /dashboard (Twig), deplace en /api/dashboard
     * pour eviter le conflit de route avec le catch-all SPA du HomeController.
     * Le front React fetch ce endpoint pour afficher le tableau de bord.
     *
     * Note : corrige le bug du return premature (ligne 33 de l'ancienne version)
     * qui rendait le code apres inaccessible.
     */
    #[Route('/api/dashboard', name: 'api_dashboard', methods: ['GET'])]
    public function index(
        PreuveRepository $preuveRepository,
        DefiRepository $defiRepository,
        ScoreRepository $scoreRepository
    ): JsonResponse {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        // defis de l'utilisateur (via ses preuves)
        $preuves = $preuveRepository->findBy(['User' => $user]);
        $defisDt = [];
        foreach ($preuves as $preuve) {
            $defisDt[] = [
                'id' => $preuve->getDefi()->getId(),
                'titre' => $preuve->getDefi()->getTitre(),
                'statut' => strtolower($preuve->getStatus()),
                'date' => $preuve->getDateEnvoi()->format('d/m/Y'),
            ];
        }

        // nombre total de defis pour la progression
        $totalDefis = count($defiRepository->findAll());

        // infos equipe
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

        // derniers scores gagnes
        $scores = $scoreRepository->findBy(
            ['user' => $user],
            ['dateGain' => 'DESC'],
            5
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

        return $this->json([
            'user' => [
                'nom' => $user->getNom(),
                'email' => $user->getEmail(),
                'scoreTotal' => $user->getScoreTotal(),
                'totalCO2' => $user->getTotalCO2(),
            ],
            'defis' => $defisDt,
            'totalDefis' => $totalDefis,
            'equipe' => $equipeDt,
            'scores' => $scoresDt,
        ]);
    }
}
