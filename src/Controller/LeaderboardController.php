<?php

namespace App\Controller;

use App\Repository\EquipeRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class LeaderboardController extends AbstractController
{
    /**
     * API JSON pour la page Classement (React SPA).
     *
     * Anciennement sur /leaderboard (Twig), deplace en /api/leaderboard
     * pour centraliser les endpoints API et laisser le routing front au HomeController.
     * Le front React fetch ce endpoint pour afficher le classement.
     */
    #[Route('/api/leaderboard', name: 'api_leaderboard', methods: ['GET'])]
    public function index(UserRepository $userRepository, EquipeRepository $equipeRepository): JsonResponse
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        // top 10 utilisateurs
        $topUsers = $userRepository->findBy([], ['scoreTotal' => 'DESC'], 10);
        $usersDt = [];
        foreach ($topUsers as $index => $u) {
            $usersDt[] = [
                'rang' => $index + 1,
                'nom' => $u->getNom(),
                'points' => $u->getScoreTotal(),
                'isMe' => ($u->getId() === $user->getId()),
            ];
        }

        // top 10 equipes
        $topEquipes = $equipeRepository->findBy([], ['scoreEquipe' => 'DESC'], 10);
        $equipesDt = [];
        foreach ($topEquipes as $index => $e) {
            $equipesDt[] = [
                'rang' => $index + 1,
                'nom' => $e->getNom(),
                'scores' => $e->getScoreEquipe(),
                'isMyTeam' => ($user->getEquipe() && $e->getId() === $user->getEquipe()->getId()),
            ];
        }

        return $this->json([
            'usersRang' => $usersDt,
            'equipesRang' => $equipesDt,
            'monRang' => $this->findUserRank($user, $userRepository),
            'monScore' => $user->getScoreTotal(),
        ]);
    }

    private function findUserRank($user, UserRepository $userRepository): int
    {
        $allUsers = $userRepository->findBy([], ['scoreTotal' => 'DESC']);
        foreach ($allUsers as $index => $u) {
            if ($u->getId() === $user->getId()) return $index + 1;
        }
        return 0;
    }
}
