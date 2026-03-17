<?php

namespace App\Controller;

use App\Repository\DefiRepository;
use App\Repository\PreuveRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class DashboardController extends AbstractController
{
    #[Route('/api/dashboard', name: 'app_api_dashboard', methods: ['GET'])]
    public function index(PreuveRepository $preuveRepository, DefiRepository $defiRepository): JsonResponse
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Non connecté'], 401);
        }

        $userDt = [
            'nom' => $user->getNom(),
            'scoreTotal' => $user->getScoreTotal(),
            'totalCO2' => $user->getTotalCO2(),
        ];

        // defis de l'utilisateur (via ses preuves)
        $toutesPreuves = $preuveRepository->findBy(['User' => $user], ['dateEnvoi' => 'DESC']);

        $defisDt = [];
        foreach ($toutesPreuves as $preuve) {
            $defisDt[] = [
                'id' => $preuve->getDefi()->getId(),
                'titre' => $preuve->getDefi()->getTitre(),
                'statut' => strtolower($preuve->getStatus()),
                'date' => $preuve->getDateEnvoi()->format('d/m/Y'),
            ];
        }

        // nombre total de defis pour la progression
        $totalDefis = count($defiRepository->findAll());

        // info equipe
        $equipe = $user->getEquipe();
        $equipeDt = $equipe ? [
            'nom' => $equipe->getNom(),
            'score' => $equipe->getScoreEquipe(),
            'membres' => count($equipe->getUsers())
        ] : null;

        // derniers defis valides
        $dernieresPreuves = $preuveRepository->findBy(
            ['User' => $user, 'status' => 'VALIDE'],
            ['dateEnvoi' => 'DESC'],
            5
        );
        $scoresDt = [];
        foreach ($dernieresPreuves as $preuve) {
            $scoresDt[] = [
                'defiTitre' => $preuve->getDefi()->getTitre(),
                'points' => $preuve->getDefi()->getPoint(),
                'date' => $preuve->getDateEnvoi()->format('d/m')
            ];
        }

        return new JsonResponse([
            'user' => $userDt,
            'defis' => $defisDt,
            'totalDefis' => $totalDefis,
            'equipe' => $equipeDt,
            'scores' => $scoresDt,
        ]);
    }
}
