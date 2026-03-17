<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{

    // Format pour transmettre les données vers React

    #[Route('/api/home', name: 'api_home', methods:['GET'])]
    public function api(): Response
    {
        $user = $this->getUser();

        $userData = null;
        if ($user instanceof User) {
            $userData = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'nom' => $user->getNom(),
            ];
        }

        $data = [
            'message' => 'Hello from Symfony', 
            'items' => [1,2,3],
            'user' => $userData
        ];
        
        return $this->json($data);
    }

    #[Route('/', name: 'app_home')]
    #[Route('/dashboard', name: 'app_dashboard')]
    #[Route('/challenge', name: 'app_challenge')]
    #[Route('/classement', name: 'app_classement')]
    #[Route('/profil', name: 'app_profil')]
    #[Route('/privacy',name:'app_legalmention')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}

