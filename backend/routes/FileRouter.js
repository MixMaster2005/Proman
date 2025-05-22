import path from "path";
import { Router } from "express";

class FileRouter {
    constructor() {
        this.router = Router();

        this.setupRoutes();
    }

    setupRoutes() {
        this.router.get("/", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/index.html"));
        });
        this.router.get("/signup", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/signup.html"));
        });
        this.router.get("/ChefDeProjetDashboard", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/chefDeProjet/bruh.html"));
        });
        this.router.get("/ChefDeProjetDashboard/projet", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/chefDeProjet/test.html"));
        });
        this.router.get("/ChefDeProjetDashboard/projet/pert", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/chefDeProjet/pert.html"));
        });
        // Correction du nom de la route pour correspondre à l'API
        this.router.get("/ChefDeProjetDashboard/projet/gantt", (req, res) => {
            const __dirname = path.resolve();
            res.sendFile(path.join(__dirname, "/frontend/src/view/chefDeProjet/gant.html"));
        });
        this.router.get("/ChefDeProjetDashboard/projet/calendar", (req, res) => {
            const __dirname = path.resolve();
            res.sendFile(path.join(__dirname, "/frontend/src/view/chefDeProjet/calendar.html"));
        });
        this.router.get("/ChefDeProjetDashboard/projet/avancement", (req, res) => {
            const __dirname = path.resolve();
            res.sendFile(path.join(__dirname, "/frontend/src/view/chefDeProjet/avancement.html"));
        });
        this.router.get("/ContributeurDashboard", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/Contributeur/bruh.html"));
        });
        this.router.get("/login", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/login.html"));
        });
        this.router.get("/gestionTaches", (req, res) => {
            const __dirname = path.resolve(); // Obtenir le chemin absolu du projet
            res.sendFile(path.join(__dirname, "/frontend/src/view/Contributeur/gestionTaches.html"));
        });
    }
    getRouter() {
        return this.router;
    }
}

export default FileRouter;
