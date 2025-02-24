<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $questionName = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(length: 255)]
    private ?string $trackingid = null;

    /**
     * Relación ManyToOne con Poll
     */
    #[ORM\ManyToOne(targetEntity: Poll::class, inversedBy: 'questions')]
    #[ORM\JoinColumn(nullable: false)] // Evita que una pregunta esté sin un poll
    private ?Poll $poll = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestionName(): ?string
    {
        return $this->questionName;
    }

    public function setQuestionName(string $questionName): static
    {
        $this->questionName = $questionName;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getTrackingid(): ?string
    {
        return $this->trackingid;
    }

    public function setTrackingid(string $trackingid): static
    {
        $this->trackingid = $trackingid;

        return $this;
    }
    public function getPoll(): ?Poll
    {
        return $this->poll;
    }

    public function setPoll(?Poll $poll): static
    {
        $this->poll = $poll;
        return $this;
    }
}
