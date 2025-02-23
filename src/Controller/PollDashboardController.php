<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/poll/dashboard')]
final class PollDashboardController extends AbstractController
{
    #[Route('/create', name: 'app_poll_create')]
    public function index(): Response
    {
        return $this->render('poll_dashboard/index.html.twig', [
            'controller_name' => 'PollDashboardController',
        ]);
    }

    #[Route('/packs', name: 'app_poll_packs')]
    public function displayPacks(): Response
    {
        return $this->render('poll_dashboard/packs.html.twig', [
            'controller_name' => 'PollDashboardController',
        ]);
    }
}
