<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{

    // Format pour transmettre les données vers React

    #[Route('/api/home', name: 'api_home', methods:['GET'])]
    public function api(): Response
    {
        $data = 
        [
            'message' => 'Hello from Symfony', 
            'items' => [1,2,3],
            'user' => [
                'name' => 'John Doe',
                'email' => 'jd@jd.jd'
            ]
        ];
        
        return $this->json($data);
    }

    #[Route('/', name: 'app_home')]
    #[Route('/dashboard', name: 'app_dashboard')]
    #[Route('/challenge', name: 'app_challenge')]
    #[Route('/classement', name: 'app_classement')]
    #[Route('/profil', name: 'app_profil')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}

