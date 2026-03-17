<?php

namespace App\Controller;

use App\Entity\Message;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class ProfileController extends AbstractController
{
    #[Route('/api/profile', name: 'app_api_profile', methods: ['GET'])]
    public function getProfile(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Non connecté'], 401);
        }

        return new JsonResponse([
            'pseudo' => $user->getNom(),
            'email' => $user->getEmail(),
            'equipe' => $user->getEquipe() ? $user->getEquipe()->getNom() : 'Aucune équipe',
            'equipe_id' => $user->getEquipe() ? $user->getEquipe()->getId() : null,
            'score_total' => $user->getScoreTotal(),
            'nb_defis_releves' => count($user->getPreuves()),
        ]);
    }

    #[Route('/api/profile/update', name: 'app_api_profile_update', methods: ['POST'])]
    public function updateProfile(
        Request $request,
        UserPasswordHasherInterface $hasher,
        EntityManagerInterface $em
    ): JsonResponse {
        /** @var User $user */
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (!$user || !$data) return new JsonResponse(['error' => 'Erreur'], 400);

        // pour modifier le nom
        if (!empty($data['nom'])) {
            $user->setNom($data['nom']);
        }

        // pour modifier le email
        if (!empty($data['email'])) {
            if (!str_contains($data['email'], '@etu')) {
                return new JsonResponse(['error' => 'L\'email doit rester un mail @etu'], 400);
            }
            $user->setEmail($data['email']);
        }

        // pour changer le mdp
        if (!empty($data['password'])) {
            $user->setPassword($hasher->hashPassword($user, $data['password']));
        }

        $em->flush();
        return new JsonResponse(['success' => 'Profil mis à jour !']);
    }

    // quitter l'équipe
    #[Route('/api/profile/leave-team', name: 'app_api_leave_team', methods: ['POST'])]
    public function leaveTeam(EntityManagerInterface $em): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        if ($user->getEquipe()) {
            $user->setEquipe(null);
            $em->flush();
            return new JsonResponse(['success' => 'Vous avez quitté l\'équipe.']);
        }

        return new JsonResponse(['error' => 'Vous n\'êtes dans aucune équipe.'], 400);
    }

    // message
    #[Route('/api/profile/messages', name: 'app_api_get_messages', methods: ['GET'])]
    public function getMessages(): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();

        if (!$user || !$user->getEquipe()) {
            return new JsonResponse(['error' => 'Veuillez rejoindre une équipe.'], 403);
        }
        $messages = $user->getEquipe()->getMessages();

        $data = [];
        foreach ($messages as $msg) {
            $data[] = [
                'id' => $msg->getId(),
                'nom' => $msg->getAuteur() ? $msg->getAuteur()->getNom() : 'Utilisateur supprimé',
                'body' => $msg->getBody(),
                'date' => $msg->getCreatedAt()->format('H:i'),
            ];
        }

        return new JsonResponse($data);
    }

    #[Route('/api/profile/messages/send', name: 'app_api_send_message', methods: ['POST'])]
    public function sendMessage(Request $request, EntityManagerInterface $em): JsonResponse
    {
        /** @var User $user */
        $user = $this->getUser();
        $data = json_decode($request->getContent(), true);

        if (!$user || !$user->getEquipe()) {
            return new JsonResponse(['error' => 'Action interdite.'], 403);
        }

        if (empty($data['body'])) {
            return new JsonResponse(['error' => 'Le message est vide.'], 400);
        }

        $message = new Message();
        $message->setBody($data['body']);
        $message->setAuteur($user);
        $message->setEquipe($user->getEquipe());

        $message->setCreatedAt(new \DateTimeImmutable());

        $em->persist($message);
        $em->flush();

        return new JsonResponse(['success' => 'Message envoyé !'], 201);
    }
}
