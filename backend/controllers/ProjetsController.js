import Projets from "../models/Projets.js";
import calculPert from "../utils/Pert.js";
import convertToGanttData from "../utils/Gant.js";
import convertToCalendarGantt from "../utils/Calendrier.js";
import avancementProjetPondere from "../utils/Avancement.js";
import Taches from "../models/Taches.js";
import TachesAnterieures from "../models/TachesAnterieurs.js";

class ProjetsController {
    constructor() {
        this.projets = new Projets();
        this.taches = new Taches();
        this.tachesAnterieures = new TachesAnterieures();
    }

    async create(req, res) {
        const { nom_projet, date_debut } = req.body;

        try {
            const id_projet = await this.projets.create(nom_projet, date_debut);
            if (id_projet) {
                res.status(201).json({ success: true, message: "Projet créé avec succès.", id_projet: id_projet });
            } else {
                res.status(500).json({ success: false, error: "Échec de la création du projet." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async readOne(req, res) {
        const { id_projet } = req.params;

        try {
            const projet = await this.projets.readById(id_projet);
            if (projet) {
                res.status(200).json(projet);
            } else {
                res.status(404).json({ error: "Projet non trouvé." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async update(req, res) {
        const { id_projet } = req.params;
        const { nom_projet, date_debut } = req.body;

        try {
            const success = await this.projets.update(id_projet, nom_projet, date_debut);
            if (success) {
                res.status(200).json({ success: true, message: "Projet mis à jour avec succès." });
            } else {
                res.status(400).json({ success: false, message: "Échec de la mise à jour." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async delete(req, res) {
        const { id_projet } = req.params;

        try {
            const success = await this.projets.delete(id_projet);
            if (success) {
                res.status(200).json({ success: true, message: "Projet supprimé avec succès." });
            } else {
                res.status(400).json({ success: false, message: "Échec de la suppression." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async readByContributeur(req, res) {
        const { id_contributeur } = req.params;

        try {
            const projets = await this.projets.readByContributeur(id_contributeur);
            res.status(200).json(projets);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des projets du contributeur." });
        }
    }

    async pert(req, res) {
        const { id_projet } = req.params;
        try {
            // 1. Récupérer toutes les tâches du projet en utilisant readByProject
            const taches = await this.taches.readByProject(id_projet);

            // 2. Récupérer les dépendances (tâches antérieures) pour chaque tâche
            const dependances = await this.tachesAnterieures.read();

            // 3. Transformer les données pour correspondre à ce que calculPert attend
            const tachesInput = taches.map(tache => ({
                id: tache.id_tache,
                nom: tache.libelle,
                duree: tache.duree,
                // Trouver les tâches précédentes pour chaque tâche
                precedentes: dependances
                    .filter(dep => dep.id_tache === tache.id_tache)
                    .map(dep => dep.id_tache_anterieure)
            }));

            // 4. Calculer le PERT avec les données transformées
            const pert = calculPert(tachesInput);

            // 5. Retourner la réponse
            res.status(200).json(pert);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors du calcul PERT." });
        }
    }

    async gantt(req, res) {
        const { id_projet } = req.params;
        try {
            // 1. Récupérer toutes les tâches du projet en utilisant readByProject
            const taches = await this.taches.readByProject(id_projet);

            // 2. Récupérer les dépendances (tâches antérieures) pour chaque tâche
            const dependances = await this.tachesAnterieures.read();

            // 3. Transformer les données pour correspondre à ce que calculPert attend
            const tachesInput = taches.map(tache => ({
                id: tache.id_tache,
                nom: tache.libelle,
                duree: tache.duree,
                // Trouver les tâches précédentes pour chaque tâche
                precedentes: dependances
                    .filter(dep => dep.id_tache === tache.id_tache)
                    .map(dep => dep.id_tache_anterieure)
            }));

            // 4. Calculer le PERT avec les données transformées
            const pert = calculPert(tachesInput);
            const gantt = convertToGanttData(pert);
            res.status(200).json(gantt);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la génération du diagramme de Gantt." });
        }
    }

    async calendrier(req, res) {
        const { id_projet } = req.params;
        try {
            const projet = await this.projets.readById(id_projet);
            if (!projet) {
                return res.status(404).json({ error: "Projet introuvable." });
            }

            const taches = await this.taches.readByProject(id_projet);
            const dependances = await this.tachesAnterieures.read();

            const tachesInput = taches.map(tache => ({
                id: tache.id_tache,
                nom: tache.libelle,
                duree: tache.duree,
                // Trouver les tâches précédentes pour chaque tâche
                precedentes: dependances
                    .filter(dep => dep.id_tache === tache.id_tache)
                    .map(dep => dep.id_tache_anterieure)
            }));

            const pert = calculPert(tachesInput);
            const calendrier = convertToCalendarGantt(pert, projet.date_debut);

            res.status(200).json(calendrier);
        } catch (error) {
            console.error("Erreur calendrier :", error);
            res.status(500).json({ error: "Erreur lors de la génération du calendrier." });
        }
    }

    async avancement(req, res) {
        const { id_projet } = req.params;
        try {
            const taches = await this.taches.readByProject(id_projet);
            const avancement = avancementProjetPondere(taches);
            res.status(200).json({ avancement });
        } catch (error) {
            console.error("Erreur avancement :", error);
            res.status(500).json({ error: "Erreur lors du calcul de l'avancement." });
        }
    }
}

export default ProjetsController;
