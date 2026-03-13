<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
    /**
     * Catch-all SPA : rend le template Twig de base qui charge l'app React.
     * React Router gere ensuite le rendu cote client selon l'URL.
     *
     * Les donnees sont servies par des endpoints API separes :
     *   - /api/dashboard   (DashboardController)
     *   - /api/challenges  (ChallengeController)
     *   - /api/leaderboard (LeaderboardController)
     *   - /api/profil      (ProfileController)
     *   - /api/home        (ci-dessous)
     *
     * Cette separation evite les conflits de routes entre Symfony et React Router.
     */
    #[Route('/', name: 'app_home')]
    #[Route('/about', name: 'app_about')]
    #[Route('/dashboard', name: 'app_dashboard')]
    #[Route('/challenge', name: 'app_challenge')]
    #[Route('/classement', name: 'app_classement')]
    #[Route('/profil', name: 'app_profil')]
    #[Route('/contact', name: 'app_contact')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }

    #[Route('/api/home', name: 'api_home', methods: ['GET'])]
    public function api(): Response
    {
        $data = [
            'message' => 'Hello from Symfony',
            'items' => [1, 2, 3],
            'user' => [
                'name' => 'John Doe',
                'email' => 'jd@jd.jd'
            ]
        ];

        return $this->json($data);
    }
}
