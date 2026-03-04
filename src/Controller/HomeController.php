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
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}

