<?php

namespace App\Controller;

use App\Repository\EquipeRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class LeaderboardController extends AbstractController
{
    #[Route('/leaderboard', name: 'app_leaderboard')]
    public function index(UserRepository $userRepository, EquipeRepository $equipeRepository): Response
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) return $this->redirectToRoute('app_login');

        // pour le classement des 10 meilleures utilisateur
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

        // pour le classement des 10 meilleures équipes
        $topEquipes = $equipeRepository->findBy([], ['scoreEquipe' => 'DESC'], 10);
        $equipesDt = [];
        foreach ($topEquipes as $index => $e) {
            $equipesDt[] = [
                'rang' => $index + 1,
                'nom' => $e->getNom(),
                'scores' => $e->getScoreEquipe(),
                'isMyTeam' => ($user->getEquipe() && $e->getId() === $user->getEquipe()->getId())
            ];
        }

        return $this->render('leaderboard/index.html.twig', [
            'usersRang' => $usersDt,
            'equipesRang' => $equipesDt,
            'monRang' => $this->findUserRank($user, $userRepository),
        ]);
    }

    // fonction pour avoir le rang du user connecté
    private function findUserRank($user, $userRepository): int
    {
        $allUsers = $userRepository->findBy([], ['scoreTotal' => 'DESC']);
        foreach ($allUsers as $index => $u) {
            if ($u->getId() === $user->getId()) return $index + 1;
        }
        return 0;
    }
}
