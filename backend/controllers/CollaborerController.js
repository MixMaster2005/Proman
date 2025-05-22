import Collaborer from "../models/Collaborer.js";
import Effectuer from "../models/Effectuer.js";

class CollaborerController {
    constructor() {
        this.collaborer = new Collaborer();
        this.effectuer = new Effectuer();
    }

    // Ajouter une collaboration
    async ajouter(req, res) {
        const { id_projet, id_contributeur } = req.body;

        console.log(id_projet);
        console.log(id_contributeur);

        try {
            const success = await this.collaborer.ajouter(id_projet, id_contributeur);
            if (success) {
                res.status(201).json({ success: true, message: "Collaboration ajoutée avec succès." });
            } else {
                res.status(500).json({ success: false, error: "Échec de l'ajout de la collaboration." });
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la collaboration :", error);
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    // Lire toutes les collaborations
    async read(req, res) {
        try {
            const collaborations = await this.collaborer.read();
            res.status(200).json(collaborations);
        } catch (error) {
            console.error("Erreur lors de la récupération des collaborations :", error);
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    // Supprimer une collaboration
    async delete(req, res) {
        const { id_collaborer } = req.params;

        try {
            const success = await this.collaborer.delete(id_collaborer);
            if (success) {
                res.status(200).json({ success: true, message: "Collaboration supprimée avec succès." });
            } else {
                res.status(400).json({ success: false, message: "Échec de la suppression de la collaboration." });
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la collaboration :", error);
            res.status(500).json({ error: "Erreur serveur." });
        }
    }
    async assignCollaborators(req, res) {
        const { id_tache, id_contributeur } = req.body;
    
        try {
            const success = await this.effectuer.assigner(id_tache, id_contributeur);
            if (success) {
                res.status(200).json({ success: true, message: "Collaborateurs assignés avec succès." });
            } else {
                res.status(500).json({ success: false, error: "Échec de l'assignation des collaborateurs." });
            }
        } catch (error) {
            console.error("Erreur lors de l'assignation des collaborateurs :", error);
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async getCollaborateurs(req, res) {
        try {
            const { id_projet } = req.params;
            console.log(id_projet);
            if (isNaN(id_projet)) {
                return res.status(400).json({ error: "ID de projet invalide." });
            }

            const collaborateurs = await this.collaborer.readCollaborateursByProject(id_projet);
            res.json(collaborateurs);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de la récupération des collaborateurs." });
        }
    }
}

export default CollaborerController;