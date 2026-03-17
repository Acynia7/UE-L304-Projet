<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AboutController extends AbstractController
{
    #[Route('/api/contact', name: 'app_api_contact_send', methods: ['POST'])]
    public function sendContact(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data['nom']) || empty($data['email']) || empty($data['message'])) {
            return new JsonResponse(['error' => 'Champs obligatoires manquants.'], 400);
        }

        $contact = new Contact();
        $contact->setNom($data['nom']);
        $contact->setEmail($data['email']);
        $contact->setSujet($data['sujet'] ?? 'Contact via Site');
        $contact->setMessage($data['message']);

        $em->persist($contact);
        $em->flush();

        return new JsonResponse(['success' => 'Message bien reçu !'], 201);
    }
}
