<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\EquipeRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LeaderboardController extends AbstractController
{
    #[Route('/api/leaderboard', name: 'app_api_leaderboard', methods: ['GET'])]
    public function index(UserRepository $userRepository, EquipeRepository $equipeRepository): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        
        if (!$user) {
            return new JsonResponse(['error' => 'Non connecté'], 401);
        }

        // top 10 utilisateurs
        $topUsers = $userRepository->findBy([], ['scoreTotal' => 'DESC'], 10);
        $usersDt = [];
        foreach ($topUsers as $index => $u) {
            $usersDt[] = [
                'rang' => $index + 1,
                'nom' => $u->getNom(),
                'points' => $u->getScoreTotal(),
                'isMe' => ($u->getId() === $user->getId())
            ];
        }

        // top 10 équipes
        $topEquipes = $equipeRepository->findBy([], ['scoreEquipe' => 'DESC'], 10);
        $equipesDt = [];
        foreach ($topEquipes as $index => $e) {
            $equipesDt[] = [
                'rang' => $index + 1,
                'nom' => $e->getNom(),
                'points' => $e->getScoreEquipe(),
                'isMyTeam' => ($user->getEquipe() && $e->getId() === $user->getEquipe()->getId())
            ];
        }

        return new JsonResponse([
            'usersRank' => $usersDt,
            'equipesRank' => $equipesDt,
            'myPersonalRank' => $this->findUserRank($user, $userRepository),
        ]);
    }

    
    // fonction pour le rang du user    
    private function findUserRank(User $user, UserRepository $userRepository): int
    {
        $allUsersSorted = $userRepository->findBy([], ['scoreTotal' => 'DESC']);
        
        foreach ($allUsersSorted as $index => $u) {
            if ($u->getId() === $user->getId()) {
                return $index + 1;
            }
        }
        
        return 0;
    }
}
