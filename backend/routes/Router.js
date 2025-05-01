import { Router } from "express";
import ContributeurController from "../controllers/ContributeurController.js";


class AppRouter {
    constructor() {
        this.router = Router();
        //this.ContributeurController = new ContributeurController();
        this.setupRoutes();
    }

    setupRoutes() {
        // User routes
        /*this.router.get("/users", (req, res) => this.ContributeurController.usersList(req, res));
        this.router.post("/signup", (req, res) => this.ContributeurController.signup(req, res));
        this.router.post("/login", (req, res) => this.ContributeurController.login(req, res));
        */   
    }

    getRouter() {
        return this.router;
    }
}

export default AppRouter;
