<?php

namespace App\Controller\Admin;

use App\Entity\Defi;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;

class DefiCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Defi::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('titre', 'Nom du Défi'),
            TextEditorField::new('description'),
            IntegerField::new('point', 'Points gagnés'),
            NumberField::new('economieCO2', 'CO2 économisé')
            ->setNumDecimals(2) 
            ->setFormTypeOptions([
                'attr' => [
                    'step' => '0.01' 
                ]
            ]),
            AssociationField::new('categorie', 'Catégorie'),
            AssociationField::new('difficulte', 'Niveau de difficulté'),
            DateTimeField::new('createdAt', 'Créé le')
            ->hideOnForm() 
            ->onlyOnIndex(),
        ];
    }
    
}
