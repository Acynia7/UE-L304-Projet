<?php

namespace App\Entity;

use App\Repository\DefiDifficulteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DefiDifficulteRepository::class)]
class DefiDifficulte
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Defi>
     */
    #[ORM\OneToMany(targetEntity: Defi::class, mappedBy: 'difficulte')]
    private Collection $defis;

    public function __construct()
    {
        $this->defis = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, Defi>
     */
    public function getDefis(): Collection
    {
        return $this->defis;
    }

    public function addDefi(Defi $defi): static
    {
        if (!$this->defis->contains($defi)) {
            $this->defis->add($defi);
            $defi->setDifficulte($this);
        }

        return $this;
    }

    public function removeDefi(Defi $defi): static
    {
        if ($this->defis->removeElement($defi)) {
            // set the owning side to null (unless already changed)
            if ($defi->getDifficulte() === $this) {
                $defi->setDifficulte(null);
            }
        }

        return $this;
    }
}
