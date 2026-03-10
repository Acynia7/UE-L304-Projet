<?php

namespace App\Controller\Admin;

use App\Entity\DefiCategorie;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;

class DefiCategorieCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return DefiCategorie::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('nom', 'Nom de la catégorie'),
        
            DateTimeField::new('createdAt', 'Créé le')
                ->hideOnForm() 
                ->onlyOnIndex(),
        ];
    }
    
}
