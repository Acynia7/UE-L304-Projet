<?php

namespace App\Controller\Admin;

use App\Entity\Defi;
use App\Entity\Preuve;
use App\Entity\User;
use App\Entity\DefiCategorie;
use App\Entity\DefiDifficulte;
use App\Entity\Equipe;
use App\Entity\Message;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('EcoBattle');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Preuve', 'fas fa-list', Preuve::class);
        yield MenuItem::linkToCrud('Utilisateur', 'fas fa-list', User::class);
        yield MenuItem::linkToCrud('Equipe', 'fas fa-comments', Equipe::class);
        yield MenuItem::linkToCrud('Défi', 'fas fa-list', Defi::class);
        yield MenuItem::linkToCrud('Catégories', 'fa fa-tags', DefiCategorie::class);
        yield MenuItem::linkToCrud('Difficultés', 'fa fa-bar-chart', DefiDifficulte::class);
        yield MenuItem::linkToCrud('Messagerie', 'fas fa-comments', Message::class);
    }

    public function configureAssets(): Assets
    {
        return Assets::new()
        ->addAssetMapperEntry('admin_js');
    }
}
