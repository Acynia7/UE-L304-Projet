<?php

namespace App\Entity;

use App\Repository\DefiRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DefiRepository::class)]
class Defi
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $point = null;

    #[ORM\Column]
    private ?float $economieCO2 = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'defis')]
    private ?DefiCategorie $categorie = null;

    #[ORM\ManyToOne(inversedBy: 'defis')]
    #[ORM\JoinColumn(nullable: false)]
    private ?DefiDifficulte $difficulte = null;

    /**
     * @var Collection<int, Preuve>
     */
    #[ORM\OneToMany(targetEntity: Preuve::class, mappedBy: 'defi')]
    private Collection $preuves;

    public function __construct()
    {
        $this->preuves = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPoint(): ?int
    {
        return $this->point;
    }

    public function setPoint(int $point): static
    {
        $this->point = $point;

        return $this;
    }

    public function getEconomieCO2(): ?float
    {
        return $this->economieCO2;
    }

    public function setEconomieCO2(float $economieCO2): static
    {
        $this->economieCO2 = $economieCO2;

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

    public function getCategorie(): ?DefiCategorie
    {
        return $this->categorie;
    }

    public function setCategorie(?DefiCategorie $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getDifficulte(): ?DefiDifficulte
    {
        return $this->difficulte;
    }

    public function setDifficulte(?DefiDifficulte $difficulte): static
    {
        $this->difficulte = $difficulte;

        return $this;
    }

    /**
     * @return Collection<int, Preuve>
     */
    public function getPreuves(): Collection
    {
        return $this->preuves;
    }

    public function addPreufe(Preuve $preufe): static
    {
        if (!$this->preuves->contains($preufe)) {
            $this->preuves->add($preufe);
            $preufe->setDefi($this);
        }

        return $this;
    }

    public function removePreufe(Preuve $preufe): static
    {
        if ($this->preuves->removeElement($preufe)) {
            // set the owning side to null (unless already changed)
            if ($preufe->getDefi() === $this) {
                $preufe->setDefi(null);
            }
        }

        return $this;
    }
}
