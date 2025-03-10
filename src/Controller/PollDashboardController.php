<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Ramsey\Uuid\Uuid;
use App\Entity\Poll;
use App\Form\PollType;
use App\Repository\PollRepository;
use Symfony\Component\HttpFoundation\JsonResponse;

final class PollDashboardController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    #[Route('/', name: 'app_home')]
    public function index(): Response|JsonResponse
    {
        $filePath = $this->getParameter('kernel.project_dir') . '/var/formations.php';
        $formations = include $filePath;
        
        return $this->render('home/index.html.twig', [
            'formations' => $formations
        ]);
    }

    #[Route('/create', name: 'app_poll_create', methods: ['GET', 'POST'])]
    public function creation(Request $request): Response
    {
        $poll = new Poll();
        $poll_trackingId = Uuid::uuid4()->toString();
        $poll->setTrackingid($poll_trackingId);

        $form = $this->createForm(PollType::class, $poll);
        $form->handleRequest($request);

        if ($form->isSubmitted() ) {

            foreach ($poll->getQuestions() as $question) {
                $question->setPoll($poll);
                $this->entityManager->persist($question);
            }
            
            $this->entityManager->persist($poll);
            $this->entityManager->flush();

            // return $this->redirectToRoute('app_poll_confirmation', ['trackingid' => $poll->getTrackingid()]);
            return $this->render('poll_dashboard/confirmation.html.twig', [
                'poll' => $poll,
            ]);
        }

        return $this->render('poll_dashboard/index.html.twig', [
            'form' => $form,
            'poll' => $poll
        ]);
    }

    #[Route('poll/{trackingid}/confirmation', name: 'app_poll_confirmation')]
    public function confirmation(string $trackingid, PollRepository $pollRepository):Response
    {

        $poll = $pollRepository->findOneBy(['trackingid' => $trackingid]);
        if (!$poll) {
            return $this->json(['error' => 'Sondage not found'], 404);
        }

        return $this->render('poll_dashboard/confirmation.html.twig', [
            'poll' => $poll,
        ]);
    }

    #[Route('poll/{trackingid}/modification', name: 'app_poll_modification')]
    public function mmodification(string $trackingid, PollRepository $pollRepository, Request $request):Response
    {

        $poll = $pollRepository->findOneBy(['trackingid' => $trackingid]);
        $form = $this->createForm(PollType::class, $poll);
        $form->handleRequest($request);

        if (!$poll) {
            return $this->json(['error' => 'Sondage not found'], 404);
        }

        return $this->render('poll_dashboard/index.html.twig', [
            'form' => $form,
            'poll' => $poll
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
