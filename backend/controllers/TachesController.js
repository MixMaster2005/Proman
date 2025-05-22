import Taches from "../models/Taches.js";
import Effectuer from "../models/Effectuer.js";
import TachesAnterieures from "../models/TachesAnterieurs.js";

class TachesController {
    constructor() {
        this.taches = new Taches();
        this.effectuer = new Effectuer();
        this.tacheAnt = new TachesAnterieures();
    }

    // === TÂCHES ===
    async create(req, res) {
        const { libelle, duree, statut, id_projet } = req.body;
        if (!libelle || !duree || !statut || !id_projet) {
            return res.status(400).json({ error: "Champs requis manquants." });
        }
        const success = await this.taches.create(libelle, duree, statut, id_projet);
        res.status(success ? 201 : 500).json({ success });
    }

    async read(req, res) {
        const data = await this.taches.read();
        res.json(data);
    }

    async readById(req, res) {
        const { id_tache } = req.params;
        const tache = await this.taches.readById(id_tache);
        if (tache) {
            res.json(tache);
        } else {
            res.status(404).json({ error: "Tâche non trouvée." });
        }
    }

    async update(req, res) {
        const { id_tache } = req.params;
        const { libelle, duree, statut } = req.body;
        const success = await this.taches.update(id_tache, libelle, duree, statut);
        res.status(success ? 200 : 500).json({ success });
    }

    async updateStatut(req, res) {
        const { id_tache } = req.params;
        const { statut } = req.body;
        const success = await this.taches.updateStatut(id_tache, statut);
        res.status(success ? 200 : 500).json({ success });
    }

    async delete(req, res) {
        const { id_tache } = req.params;
        const success = await this.taches.delete(id_tache);
        res.status(success ? 200 : 500).json({ success });
    }
    async readByProjet(req, res) {
        const { id_projet } = req.params;
        const data = await this.taches.readByProject(id_projet);
        res.json(data);
    }

    async readByContributeur(req, res) {
        const { id_contributeur } = req.params;
        const data = await this.taches.readByContributeur(id_contributeur);
        res.json(data);
    }

    async readByStatut(req, res) {
        const { statut, id_projet } = req.params;
        const data = await this.taches.readBystatut(statut, id_projet);
        res.json(data);
    }

    async getTachesByProjetAndContributeur(req, res) {
        const { id_projet, id_contributeur } = req.params; // On récupère les paramètres id_projet et id_contributeur depuis l'URL

        console.log(`🔍 getTachesByProjetAndContributeur appelée avec projet=${id_projet}, contributeur=${id_contributeur}`);

        //try {
            // Appel de la méthode readByProjetAndContributeur du modèle
            const taches = await this.taches.readByProjetAndContributeur(id_projet, id_contributeur);

            if (taches.length > 0) {
                // Si des tâches sont trouvées, on les renvoie en réponse
                res.status(200).json(taches);
            } else {
                // Si aucune tâche n'est trouvée, on renvoie une réponse avec un code 404
                res.status(404).json({ message: "Aucune tâche trouvée pour ce contributeur sur ce projet." });
            }
        /*} catch (error) {
            // En cas d'erreur, on renvoie un message d'erreur
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des tâches.", error: error.message });
        }*/
    }
   /* async readContributorsWithTasks(req, res) {
        const { id_projet } = req.params; // Récupère l'ID du projet depuis les paramètres de la requête
    
        try {
            // Appel de la méthode readContributorsWithTasks du modèle Taches
            const data = await this.taches.readContributorsWithTasks(id_projet);
    
            if (data.length > 0) {
                // Si des données sont trouvées, on les renvoie en réponse
                res.status(200).json(data);
            } else {
                // Si aucune donnée n'est trouvée, on renvoie une réponse avec un code 404
                res.status(404).json({ message: "Aucun contributeur ou tâche trouvé pour ce projet." });
            }
        } catch (error) {
            // En cas d'erreur, on renvoie un message d'erreur
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des contributeurs et tâches.", error: error.message });
        }
    }*/
        async readTasksWithCollaborators(req, res) {
            const { id_projet } = req.params;
        
            try {
                const data = await this.taches.readTasksWithCollaborators(id_projet);
        
                if (data.length > 0) {
                    // Regrouper les tâches avec leurs collaborateurs
                    const tasks = data.reduce((acc, row) => {
                        const taskIndex = acc.findIndex(task => task.id_tache === row.id_tache);
        
                        if (taskIndex === -1) {
                            acc.push({
                                id_tache: row.id_tache,
                                libelle: row.libelle,
                                duree: row.duree,
                                statut: row.statut,
                                collaborateurs: row.nom_contributeur
                                    ? [{ id_contributeur: row.id_contributeur, nom: row.nom_contributeur }]
                                    : []
                            });
                        } else if (row.nom_contributeur) {
                            acc[taskIndex].collaborateurs.push({
                                id_contributeur: row.id_contributeur,
                                nom: row.nom_contributeur
                            });
                        }
        
                        return acc;
                    }, []);
        
                    res.status(200).json(tasks);
                } else {
                    res.status(404).json({ message: "Aucune tâche trouvée pour ce projet." });
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Erreur lors de la récupération des tâches avec collaborateurs.", error: error.message });
            }
        }
    // === EFFECTUER ===
    async assigner(req, res) {
        const { id_contributeur, id_tache } = req.body;
        if (!id_contributeur || !id_tache) {
            return res.status(400).json({ error: "id_contributeur et id_tache requis." });
        }
        const success = await this.effectuer.assigner(id_contributeur, id_tache);
        res.status(success ? 201 : 500).json({ success });
    }

    async readAssignments(req, res) {
        const data = await this.effectuer.read();
        res.json(data);
    }

    async deleteAssignment(req, res) {
        const { id_eff } = req.params;
        const success = await this.effectuer.delete(id_eff);
        res.status(success ? 200 : 500).json({ success });
    }

    // === TÂCHES ANTÉRIEURES ===
    async addDependance(req, res) {
        const { id_tache, id_tache_anterieure } = req.body;
        if (!id_tache || !id_tache_anterieure) {
            return res.status(400).json({ error: "Champs requis manquants pour la dépendance." });
        }
        const success = await this.tacheAnt.ajouterDependance(id_tache, id_tache_anterieure);
        res.status(success ? 201 : 500).json({ success });
    }

    async getDependances(req, res) {
        const { id_tache } = req.params;
        const data = await this.tacheAnt.readByTache(id_tache);
        res.json(data);
    }

    async deleteDependance(req, res) {
        const { id_ant } = req.params;
        const success = await this.tacheAnt.delete(id_ant);
        res.status(success ? 200 : 500).json({ success });
    }
}

export default TachesController;
