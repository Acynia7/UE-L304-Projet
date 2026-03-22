<?php

namespace App\Controller\Admin;

use App\Entity\Preuve;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;

class PreuveCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Preuve::class;
    }
    
    public function configureFields(string $pageName): iterable
    {
        return [
        TextField::new('utilisateur.nom', 'Joueur')->hideOnForm(),
        TextField::new('defi.titre', 'Défi')->hideOnForm(),
        ImageField::new('urlImage', 'Preuve Photo')
            ->setBasePath('/uploads/preuves')
            ->setUploadDir('public/uploads/preuves')
            ->onlyOnIndex(),
        ChoiceField::new('status')
            ->setChoices([
                'En attente' => 'EN_ATTENTE',
                'Validé' => 'VALIDE',
                'Refusé' => 'REFUSE',
            ]),
    ];
    }

    // fonction pour que l'admin valide la preuve du défi
    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        if ($entityInstance instanceof Preuve) {
            $originalData = $entityManager->getUnitOfWork()->getOriginalEntityData($entityInstance);
            $previousStatus = $originalData['status'] ?? null;
            $newStatus = $entityInstance->getStatus();

            if ($newStatus === 'VALIDE' && $previousStatus !== 'VALIDE') {
                $user = $entityInstance->getUser();
                $defi = $entityInstance->getDefi();
                $user->setScoreTotal($user->getScoreTotal() + $defi->getPoint());
                $user->setTotalCO2($user->getTotalCO2() + $defi->getEconomieCO2());
                if ($user->getEquipe()) {
                    $equipe = $user->getEquipe();
                    $equipe->setScoreEquipe($equipe->getScoreEquipe() + $defi->getPoint());
                }
            } elseif ($previousStatus === 'VALIDE' && $newStatus !== 'VALIDE') {
                $user = $entityInstance->getUser();
                $defi = $entityInstance->getDefi();
                $user->setScoreTotal($user->getScoreTotal() - $defi->getPoint());
                $user->setTotalCO2($user->getTotalCO2() - $defi->getEconomieCO2());
                if ($user->getEquipe()) {
                    $equipe = $user->getEquipe();
                    $equipe->setScoreEquipe($equipe->getScoreEquipe() - $defi->getPoint());
                }
            }
        }
        parent::updateEntity($entityManager, $entityInstance);
    }
}
