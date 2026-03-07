<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\DefiRepository;
use App\Repository\PreuveRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Preuve;
use App\Entity\Defi;
use App\Entity\User;
use App\Form\PreuveType;

final class ChallengeController extends AbstractController
{
    #[Route('/challenge', name: 'app_challenge')]
    public function index(DefiRepository $defiRepository, PreuveRepository $preuveRepository): Response
    {
        // seul l'utilisateur connecter peut accéder à ses challenges
        $user = $this->getUser();
        if (!$user) return $this->redirectToRoute('app_login');

        $allDefis = $defiRepository->findAll();
        $validDefi = [];
        $defiAttente = [];
        $toDoDefi = [];

        foreach($allDefis as $defi){
            $preuve = $preuveRepository->findOneBy(['user' => $user, 'defi' => $defi]);
            if(!$preuve){
                $toDoDefi[] = $defi;
            }elseif($preuve->getStatus() === 'VALIDE'){
                $validDefi[] = $defi;
            }else{
                $defiAttente[] = $defi;
            }
        }

        return $this->render('challenge/index.html.twig', [
            'toDoDefi' => $toDoDefi,
            'validDefi' => $validDefi,
            'defiAttente' => $defiAttente,
            'scorePerso' => $user->getScoreTotal(),
            'scoreEquipe' => $user->getEquipe() ? $user->getEquipe()->getScoreEquipe() : 0,
        ]);
    }

    #[Route('/enregistre/{id}', name: 'app_challenge_submit')]
    public function submit(Defi $defi, Request $request, EntityManagerInterface $em, SluggerInterface $slugger): Response
    {
        $user = $this->getUser();
        $preuve = new Preuve();
        $form = $this->createForm(PreuveType::class, $preuve);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()){
            // gérer l'envoie de la preuve en image
            $imageFile = $form->get('image')->getData();
            if($imageFile){
                $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$imageFile->guessExtension();

                $imageFile->move(
                    $this->getParameter('preuves_directory'),
                    $newFilename
                );
                $preuve->setUrlImage($newFilename);
            }
            $preuve->setUser($this->getUser());
            $preuve->setDefi($defi);
            $preuve->setDateEnvoi(new \DateTimeImmutable());
            $preuve->setStatus('EN_ATTENTE');
            
            $em->persist($preuve);
            $em->flush();
            $this->addFlash('info', 'Votre preuve a été envoyée :). Elle sera validée par un admin prochainement !');
            return $this->redirectToRoute('app_challenge_index');
        }

        return $this->render('challenge/submit.html.twig', [
            'form' => $form->createView(),
            'defi' => $defi
        ]);
    }
}
