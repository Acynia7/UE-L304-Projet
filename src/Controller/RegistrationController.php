<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $em): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['email']) || !isset($data['nom']) || !isset($data['password'])) {
            return new JsonResponse(['error' => 'Champs manquants.'], 400);
        }

        $email = $data['email'];
        $nom = $data['nom'];
        $password = $data['password'];
        if (!str_contains($email, '@etu')) {
            return new JsonResponse(['error' => 'L\'email doit contenir @etu pour s\'inscrire.'], 400);
        }
        $user = new User();
        $user->setEmail($email);
        $user->setNom($nom);

        $user->setScoreTotal(0);
        $user->setTotalCO2(0);
        $user->setPassword($hasher->hashPassword($user, $password));

        try {
            $em->persist($user);
            $em->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 500);
        }

        return new JsonResponse(['success' => 'Inscription réussie !'], 201);
    }
}
