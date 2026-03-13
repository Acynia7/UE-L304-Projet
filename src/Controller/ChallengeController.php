<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\DefiRepository;
use App\Repository\PreuveRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Preuve;
use App\Entity\Defi;
use App\Form\PreuveType;

final class ChallengeController extends AbstractController
{
    /**
     * API JSON pour la page Challenge (React SPA).
     *
     * Anciennement sur /challenge (Twig), deplace en /api/challenges
     * pour eviter le conflit de route avec le catch-all SPA du HomeController.
     * Le front React fetch ce endpoint pour recuperer les defis de l'utilisateur.
     */
    #[Route('/api/challenges', name: 'api_challenges', methods: ['GET'])]
    public function index(DefiRepository $defiRepository, PreuveRepository $preuveRepository): JsonResponse
    {
        /** @var \App\Entity\User $user */
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $allDefis = $defiRepository->findAll();
        $toDoDefi = [];
        $defiAttente = [];
        $validDefi = [];

        foreach ($allDefis as $defi) {
            $preuve = $preuveRepository->findOneBy(['User' => $user, 'defi' => $defi]);

            $defiData = [
                'id' => $defi->getId(),
                'titre' => $defi->getTitre(),
                'description' => $defi->getDescription(),
                'point' => $defi->getPoint(),
                'economieCO2' => $defi->getEconomieCO2(),
                'categorie' => $defi->getCategorie() ? $defi->getCategorie()->getNom() : null,
                'difficulte' => $defi->getDifficulte() ? $defi->getDifficulte()->getNom() : null,
            ];

            if (!$preuve) {
                $defiData['statut'] = 'a-faire';
                $toDoDefi[] = $defiData;
            } elseif ($preuve->getStatus() === 'VALIDE') {
                $defiData['statut'] = 'valide';
                $validDefi[] = $defiData;
            } else {
                $defiData['statut'] = 'en-cours';
                $defiAttente[] = $defiData;
            }
        }

        return $this->json([
            'defis' => array_merge($toDoDefi, $defiAttente, $validDefi),
            'scorePerso' => $user->getScoreTotal(),
            'scoreEquipe' => $user->getEquipe() ? $user->getEquipe()->getScoreEquipe() : 0,
        ]);
    }

    /**
     * Soumission d'une preuve pour un defi.
     * Deplace de /enregistre/{id} vers /api/challenge/{id}/submit.
     */
    #[Route('/api/challenge/{id}/submit', name: 'api_challenge_submit', methods: ['POST'])]
    public function submit(Defi $defi, Request $request, EntityManagerInterface $em, SluggerInterface $slugger): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $imageFile = $request->files->get('image');
        if (!$imageFile) {
            return $this->json(['error' => 'Image requise'], 400);
        }

        $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

        $imageFile->move(
            $this->getParameter('preuves_directory'),
            $newFilename
        );

        $preuve = new Preuve();
        $preuve->setUrlImage($newFilename);
        $preuve->setUser($user);
        $preuve->setDefi($defi);
        $preuve->setDateEnvoi(new \DateTimeImmutable());
        $preuve->setStatus('EN_ATTENTE');

        $em->persist($preuve);
        $em->flush();

        return $this->json([
            'success' => true,
            'message' => 'Preuve envoyee, elle sera validee par un admin prochainement.'
        ]);
    }
}
