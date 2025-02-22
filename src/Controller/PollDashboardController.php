<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PollDashboardController extends AbstractController{
    #[Route('/poll/dashboard', name: 'app_poll_dashboard')]
    public function index(): Response
    {
        return $this->render('poll_dashboard/index.html.twig', [
            'controller_name' => 'PollDashboardController',
        ]);
    }
}
