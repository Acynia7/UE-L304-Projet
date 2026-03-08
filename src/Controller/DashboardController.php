<?php

namespace App\Controller;

use App\Repository\PreuveRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class DashboardController extends AbstractController
{
    #[Route('/dashboard', name: 'app_dashboard')]
    public function index(PreuveRepository $preuveRepository, UserRepository $userRepository): Response
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if(!$user) return $this->redirectToRoute('app_login');

        // afficher les defis
        $preuves = $preuveRepository->findBy(['user' => $user]);
        $defiDt = [];
        foreach($preuves as $preuve){
            $defiDt[] = [
                'id' => $preuve->getDefi()->getId(),
                'titre' => $preuve->getDefi()->getTitre(),
                'statut' => strtolower($preuve->getStatus()), 
                'date' => $preuve->getDateEnvoi()->format('d/m/Y')
            ];
        }
        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
        ]);

        // afficher les informations de l'équipe
        $equipe = $user->getEquipe();
        $equipeDt = $equipe ? [
            'nom' => $equipe->getNom(),
            'score' => $equipe->getScoreEquipe(),
            'membres' => count($equipe->getUsers())
        ] : null ;

        // afficher les derniers scores gagnés par le user
        $dernieresPreuves = $preuveRepo->findBy(
            ['utilisateur' => $user, 'statut' => 'VALIDE'],
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

        return $this->render('dashboard/index.html.twig', [
            'userDt' => [
                'nom' => $user->getNom(),
                'scoreTotal' => $user->getScoreTotal(),
                'totalCO2' => $user->getTotalCO2(),
            ],
            'defis' => $defisDt,
            'equipe' => $equipeDt,
            'scores' => $scoresDt
        ]);
    }

}
