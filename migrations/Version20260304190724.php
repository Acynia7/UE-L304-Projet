<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260304190724 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE classement (id INT AUTO_INCREMENT NOT NULL, updated_at DATETIME NOT NULL, statut VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, type_id INT DEFAULT NULL, competition_id INT DEFAULT NULL, INDEX IDX_55EE9D6DC54C8C93 (type_id), INDEX IDX_55EE9D6D7B39D312 (competition_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE classement_type (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE competition (id INT AUTO_INCREMENT NOT NULL, nom_comp VARCHAR(255) NOT NULL, objectif LONGTEXT NOT NULL, recompense VARCHAR(255) NOT NULL, date_debut DATETIME NOT NULL, date_fin DATETIME NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE competition_defi (competition_id INT NOT NULL, defi_id INT NOT NULL, INDEX IDX_D2963D4C7B39D312 (competition_id), INDEX IDX_D2963D4C73F00F27 (defi_id), PRIMARY KEY (competition_id, defi_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE competition_equipe (competition_id INT NOT NULL, equipe_id INT NOT NULL, INDEX IDX_4B0A7AC67B39D312 (competition_id), INDEX IDX_4B0A7AC66D861B89 (equipe_id), PRIMARY KEY (competition_id, equipe_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE conversation (id INT AUTO_INCREMENT NOT NULL, date_last_message DATETIME NOT NULL, users_id INT DEFAULT NULL, INDEX IDX_8A8E26E967B3B43D (users_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE defi (id INT AUTO_INCREMENT NOT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, point INT NOT NULL, economie_co2 DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL, categorie_id INT DEFAULT NULL, difficulte_id INT NOT NULL, INDEX IDX_DCD5A35EBCF5E72D (categorie_id), INDEX IDX_DCD5A35EE6357589 (difficulte_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE defi_categorie (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE defi_difficulte (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE equipe (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, score_equipe INT NOT NULL, code_invitation VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, created_at DATETIME NOT NULL, auteur_id INT DEFAULT NULL, conversation_id INT DEFAULT NULL, INDEX IDX_B6BD307F60BB6FE6 (auteur_id), INDEX IDX_B6BD307F9AC0396 (conversation_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE preuve (id INT AUTO_INCREMENT NOT NULL, url_image VARCHAR(255) NOT NULL, date_envoi DATETIME NOT NULL, status VARCHAR(255) NOT NULL, defi_id INT DEFAULT NULL, user_id INT DEFAULT NULL, INDEX IDX_238DF9E073F00F27 (defi_id), INDEX IDX_238DF9E0A76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE score (id INT AUTO_INCREMENT NOT NULL, valeur INT NOT NULL, date_gain DATETIME NOT NULL, motif VARCHAR(255) NOT NULL, user_id INT DEFAULT NULL, equipe_id INT DEFAULT NULL, INDEX IDX_32993751A76ED395 (user_id), INDEX IDX_329937516D861B89 (equipe_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, score_total INT NOT NULL, total_co2 DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL, equipe_id INT DEFAULT NULL, INDEX IDX_8D93D6496D861B89 (equipe_id), UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE classement ADD CONSTRAINT FK_55EE9D6DC54C8C93 FOREIGN KEY (type_id) REFERENCES classement_type (id)');
        $this->addSql('ALTER TABLE classement ADD CONSTRAINT FK_55EE9D6D7B39D312 FOREIGN KEY (competition_id) REFERENCES competition (id)');
        $this->addSql('ALTER TABLE competition_defi ADD CONSTRAINT FK_D2963D4C7B39D312 FOREIGN KEY (competition_id) REFERENCES competition (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE competition_defi ADD CONSTRAINT FK_D2963D4C73F00F27 FOREIGN KEY (defi_id) REFERENCES defi (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE competition_equipe ADD CONSTRAINT FK_4B0A7AC67B39D312 FOREIGN KEY (competition_id) REFERENCES competition (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE competition_equipe ADD CONSTRAINT FK_4B0A7AC66D861B89 FOREIGN KEY (equipe_id) REFERENCES equipe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE conversation ADD CONSTRAINT FK_8A8E26E967B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE defi ADD CONSTRAINT FK_DCD5A35EBCF5E72D FOREIGN KEY (categorie_id) REFERENCES defi_categorie (id)');
        $this->addSql('ALTER TABLE defi ADD CONSTRAINT FK_DCD5A35EE6357589 FOREIGN KEY (difficulte_id) REFERENCES defi_difficulte (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F60BB6FE6 FOREIGN KEY (auteur_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F9AC0396 FOREIGN KEY (conversation_id) REFERENCES conversation (id)');
        $this->addSql('ALTER TABLE preuve ADD CONSTRAINT FK_238DF9E073F00F27 FOREIGN KEY (defi_id) REFERENCES defi (id)');
        $this->addSql('ALTER TABLE preuve ADD CONSTRAINT FK_238DF9E0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE score ADD CONSTRAINT FK_32993751A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE score ADD CONSTRAINT FK_329937516D861B89 FOREIGN KEY (equipe_id) REFERENCES equipe (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6496D861B89 FOREIGN KEY (equipe_id) REFERENCES equipe (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE classement DROP FOREIGN KEY FK_55EE9D6DC54C8C93');
        $this->addSql('ALTER TABLE classement DROP FOREIGN KEY FK_55EE9D6D7B39D312');
        $this->addSql('ALTER TABLE competition_defi DROP FOREIGN KEY FK_D2963D4C7B39D312');
        $this->addSql('ALTER TABLE competition_defi DROP FOREIGN KEY FK_D2963D4C73F00F27');
        $this->addSql('ALTER TABLE competition_equipe DROP FOREIGN KEY FK_4B0A7AC67B39D312');
        $this->addSql('ALTER TABLE competition_equipe DROP FOREIGN KEY FK_4B0A7AC66D861B89');
        $this->addSql('ALTER TABLE conversation DROP FOREIGN KEY FK_8A8E26E967B3B43D');
        $this->addSql('ALTER TABLE defi DROP FOREIGN KEY FK_DCD5A35EBCF5E72D');
        $this->addSql('ALTER TABLE defi DROP FOREIGN KEY FK_DCD5A35EE6357589');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F60BB6FE6');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F9AC0396');
        $this->addSql('ALTER TABLE preuve DROP FOREIGN KEY FK_238DF9E073F00F27');
        $this->addSql('ALTER TABLE preuve DROP FOREIGN KEY FK_238DF9E0A76ED395');
        $this->addSql('ALTER TABLE score DROP FOREIGN KEY FK_32993751A76ED395');
        $this->addSql('ALTER TABLE score DROP FOREIGN KEY FK_329937516D861B89');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6496D861B89');
        $this->addSql('DROP TABLE classement');
        $this->addSql('DROP TABLE classement_type');
        $this->addSql('DROP TABLE competition');
        $this->addSql('DROP TABLE competition_defi');
        $this->addSql('DROP TABLE competition_equipe');
        $this->addSql('DROP TABLE conversation');
        $this->addSql('DROP TABLE defi');
        $this->addSql('DROP TABLE defi_categorie');
        $this->addSql('DROP TABLE defi_difficulte');
        $this->addSql('DROP TABLE equipe');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE preuve');
        $this->addSql('DROP TABLE score');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
