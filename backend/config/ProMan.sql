-- Table des contributeurs
CREATE TABLE contributeur (
    id_contributeur INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE, -- Un email doit être unique
    nom VARCHAR(100) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    type TINYINT(1) NOT NULL -- 0 = utilisateur normal, 1 = admin par exemple
);

-- Table des projets
CREATE TABLE projets (
    id_projet INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom_projet VARCHAR(100) NOT NULL,
    date_debut DATE NOT NULL
);

-- Table des tâches
CREATE TABLE taches (
    id_tache INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(100) NOT NULL,
    duree INT NOT NULL, -- En jours
    statut TINYINT(1) NOT NULL, -- 0 = non terminé, 1 = terminé
    id_projet INT NOT NULL,
    CONSTRAINT fk_taches_projet FOREIGN KEY (id_projet)
        REFERENCES projets(id_projet)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Table pour affectation des tâches aux contributeurs
CREATE TABLE effectuer (
    id_eff INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_contributeur INT NOT NULL,
    id_tache INT NOT NULL,
    CONSTRAINT fk_eff_contributeur FOREIGN KEY (id_contributeur)
        REFERENCES contributeur(id_contributeur)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_eff_tache FOREIGN KEY (id_tache)
        REFERENCES taches(id_tache)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    UNIQUE (id_contributeur, id_tache) -- Un contributeur ne peut effectuer la même tâche deux fois
);

-- Table des dépendances entre tâches (tâches antérieures)
CREATE TABLE taches_anterieures (
    id_ant INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_tache INT NOT NULL,
    id_tache_anterieure INT NOT NULL,
    CONSTRAINT fk_tache_dependante FOREIGN KEY (id_tache)
        REFERENCES taches(id_tache)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_tache_precedente FOREIGN KEY (id_tache_anterieure)
        REFERENCES taches(id_tache)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    UNIQUE (id_tache, id_tache_anterieure) -- Évite les doublons de dépendance
);

-- Table des collaborateurs sur un projet
CREATE TABLE collaborer (
    id_collaborer INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_projet INT NOT NULL,
    id_contributeur INT NOT NULL,
    CONSTRAINT fk_collab_projet FOREIGN KEY (id_projet)
        REFERENCES projets(id_projet)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_collab_contributeur FOREIGN KEY (id_contributeur)
        REFERENCES contributeur(id_contributeur)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    UNIQUE (id_projet, id_contributeur) -- Évite que la même personne soit ajoutée plusieurs fois au même projet
);
