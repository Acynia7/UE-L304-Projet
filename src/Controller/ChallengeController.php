<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Preuve;
use App\Entity\Defi;
use App\Repository\DefiRepository;
use App\Repository\PreuveRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;

final class ChallengeController extends AbstractController
{
    #[Route('/api/challenges', name: 'app_api_challenges', methods: ['GET'])]
    public function index(DefiRepository $defiRepository, PreuveRepository $preuveRepository): JsonResponse
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) return new JsonResponse(['error' => 'Non connecté'], 401);

        $allDefis = $defiRepository->findAll();
        $data = [
            'toDo' => [],
            'valid' => [],
            'pending' => []
        ];

        foreach ($allDefis as $defi) {
            $preuve = $preuveRepository->findOneBy(['User' => $user, 'defi' => $defi]);  
            $defiArray = [
                'id' => $defi->getId(),
                'titre' => $defi->getTitre(),
                'description' => $defi->getDescription(),
                'points' => $defi->getPoint(),
            ];

            if (!$preuve) {
                $data['toDo'][] = $defiArray;
            } elseif ($preuve->getStatus() === 'VALIDE') {
                $data['valid'][] = $defiArray;
            } else {
                $data['pending'][] = $defiArray;
            }
        }

        return new JsonResponse($data);
    }

    #[Route('/api/challenges/submit/{id}', name: 'app_api_challenge_submit', methods: ['POST'])]
    public function submit(
        Defi $defi, 
        Request $request, 
        EntityManagerInterface $em, 
        SluggerInterface $slugger
    ): JsonResponse {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) return new JsonResponse(['error' => 'Non connecté'], 401);

        $imageFile = $request->files->get('image');
        
        if (!$imageFile) {
            return new JsonResponse(['error' => 'Image manquante'], 400);
        }
        $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename.'-'.uniqid().'.'.$imageFile->guessExtension();

        try {
            $imageFile->move(
                $this->getParameter('preuves_directory'), 
                $newFilename
            );
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Erreur lors de l\'upload'], 500);
        }

        $preuve = new Preuve();
        $preuve->setUrlImage($newFilename);
        $preuve->setUser($user);
        $preuve->setDefi($defi);
        $preuve->setDateEnvoi(new \DateTimeImmutable());
        $preuve->setStatus('EN_ATTENTE');

        $em->persist($preuve);
        $em->flush();

        return new JsonResponse(['success' => 'Preuve envoyée en attente de validation'], 201);
    }
}
