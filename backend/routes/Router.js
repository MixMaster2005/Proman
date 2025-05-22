import path from "path";
import { Router } from "express";
import ContributeurController from "../controllers/ContributeurController.js";
import ProjetsController from "../controllers/ProjetsController.js";
import TachesController from "../controllers/TachesController.js";
import SessionContributeur from "../session/session_helper.js";
import verifyToken from "../middleware/authMiddleware.js";
import CollaborerController from "../controllers/CollaborerController.js";


class AppRouter {
    constructor() {
        this.router = Router();
        this.ContributeurController = new ContributeurController();
        this.ProjetsController = new ProjetsController();
        this.TachesController = new TachesController();
        this.collaborerController = new CollaborerController();

        this.setupRoutes();
    }

    setupRoutes() {
        // === ROUTES PUBLIQUES (sans authentification) ===
        this.router.post("/signup", (req, res) => this.ContributeurController.signup(req, res));
        this.router.post("/login", (req, res) => SessionContributeur.login(req, res));

        // === MIDDLEWARE D'AUTHENTIFICATION ===
        //this.router.use(verifyToken);  // Toutes les routes ci-dessous requièrent un token valide

        // === CONTRIBUTEUR ===
        this.router.delete("/contributeur", (req, res) => this.ContributeurController.delete(req, res));
        this.router.get("/contributeur/email/:email", (req, res) => this.ContributeurController.getContributeurByEmail(req, res));
        
        // === PROJETS ===
        this.router.post("/projets", (req, res) => this.ProjetsController.create(req, res));
        this.router.get("/projets/:id_projet", (req, res) => this.ProjetsController.readOne(req, res));
        this.router.put("/projets/:id_projet", (req, res) => this.ProjetsController.update(req, res));
        this.router.delete("/projets/:id_projet", (req, res) => this.ProjetsController.delete(req, res));
        this.router.get("/projets/contributeur/:id_contributeur", (req, res) => this.ProjetsController.readByContributeur(req, res));

        // === VISUALISATIONS / OUTILS D’AIDE À LA PLANIFICATION ===
        this.router.get("/projets/:id_projet/pert", (req, res) => this.ProjetsController.pert(req, res));
        this.router.get("/projets/:id_projet/gantt", (req, res) => this.ProjetsController.gantt(req, res));
        this.router.get("/projets/:id_projet/calendrier", (req, res) => this.ProjetsController.calendrier(req, res));
        this.router.get("/projets/:id_projet/avancement", (req, res) => this.ProjetsController.avancement(req, res));

        // === TÂCHES ===
        this.router.post("/taches", (req, res) => this.TachesController.create(req, res));
        this.router.get("/taches", (req, res) => this.TachesController.read(req, res));
        this.router.get("/taches/:id_tache", (req, res) => this.TachesController.readById(req, res));
        this.router.put("/taches/:id_tache", (req, res) => this.TachesController.update(req, res));
        this.router.patch("/taches/:id_tache/statut", (req, res) => this.TachesController.updateStatut(req, res));
        this.router.delete("/taches/:id_tache", (req, res) => this.TachesController.delete(req, res));
        this.router.get("/taches/contributeur/:id_contributeur", (req, res) => this.TachesController.readByContributeur(req, res));
        this.router.get("/taches/statut/:statut/projet/:id_projet", (req, res) => this.TachesController.readByStatut(req, res));
        this.router.get('/projet/:id_projet/contributeur/:id_contributeur/taches', (req, res) => this.TachesController.getTachesByProjetAndContributeur(req, res));
        this.router.get("/projets/:id_projet/contributeurs-taches", (req, res) => {this.TachesController.readContributorsWithTasks(req, res);});

        // === ASSIGNATIONS (EFFECTUER) ===
        this.router.post("/assigner", (req, res) => this.collaborerController.assignCollaborators(req, res));
        //this.router.post("/assigner", (req, res) => this.TachesController.assigner(req, res));
        this.router.get("/assigner", (req, res) => this.TachesController.readAssignments(req, res));
        this.router.delete("/assigner/:id_eff", (req, res) => this.TachesController.deleteAssignment(req, res));

        // === DÉPENDANCES ENTRE TÂCHES ===
        this.router.post("/taches/dependances", (req, res) => this.TachesController.addDependance(req, res));
        this.router.get("/taches/:id_tache/dependances", (req, res) => this.TachesController.getDependances(req, res));
        this.router.delete("/taches/dependances/:id_ant", (req, res) => this.TachesController.deleteDependance(req, res));
        this.router.get('/projet/:id_projet', (req, res) => this.TachesController.readByProjet(req, res));
        this.router.get("/projets/:id_projet/taches-collaborateurs", (req, res) => {
            this.TachesController.readTasksWithCollaborators(req, res);
        });
        // === ROUTES POUR LES COLLABORATIONS ===
        this.router.post("/collaborer", (req, res) => this.collaborerController.ajouter(req, res)); // Ajouter une collaboration
        this.router.get("/collaborer", (req, res) => this.collaborerController.read(req, res)); // Lire toutes les collaborations
        this.router.delete("/collaborer/:id_collaborer", (req, res) => this.collaborerController.delete(req, res)); // Supprimer une collaboration
        this.router.get('/projets/:id_projet/collaborateurs', (req, res) => this.collaborerController.getCollaborateurs(req, res)); //Lire collaborateurs qui contribuent dans un projet



    }



    // === ROUTES POUR LES COLLABORATIONS ===


    getRouter() {
        return this.router;
    }
}

export default AppRouter;
