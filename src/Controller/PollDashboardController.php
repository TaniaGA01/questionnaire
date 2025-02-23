<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\String\Slugger\SluggerInterface;
use Ramsey\Uuid\Uuid;
use App\Entity\Poll;
use App\Form\PollType;

#[Route('/poll/dashboard')]
final class PollDashboardController extends AbstractController
{
    private $entityManager;

    // Inyección de dependencias en el constructor
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/create', name: 'app_poll_create')]
    public function index(Request $request): Response
    {
        $poll = new Poll();
        $poll_trackingId = Uuid::uuid4()->toString();
        $poll->setTrackingid($poll_trackingId);

        $form = $this->createForm(PollType::class, $poll);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            foreach ($poll->getQuestions() as $question) {
                if (!$question->getTrackingid()) {
                    $question->setTrackingid(Uuid::uuid4()->toString());
                }
            }

            $this->entityManager->persist($poll);
            $this->entityManager->flush();

            return $this->redirectToRoute('poll_index'); // Redirige donde sea necesario
        }

        return $this->render('poll_dashboard/index.html.twig', [
            'form' => $form,
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
