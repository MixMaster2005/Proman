import bcrypt from "bcrypt";
import Contributeur from "../models/Contributeur.js";

class ContributeurController {
    constructor() {
        this.contributeur = new Contributeur();
    }

    async list(req, res) {
        try {
            const users = await this.contributeur.read();

            const filtered = users.map(user => ({
                id_user: user.id_user,
                nom_user: user.nom_user,
                email: user.email
            }));

            res.status(200).json(filtered);
        } catch (error) {
            res.status(500).json({ error: "Erreur lors de la récupération des contributeurs." });
        }
    }

    async signup(req, res) {
        const { nom, email, mdp, type } = req.body;

        try {
            const hashedPwd = await bcrypt.hash(mdp, 10);
            const success = await this.contributeur.create(nom, email, hashedPwd, type);

            if (success) {
                res.status(201).json({ success: true, message: "Contributeur créé avec succès." });
            } else {
                res.status(500).json({ success: false, error: "Échec de la création du contributeur." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async login(req, res) {
        const { email, mdp } = req.body;
        const user = await this.contributeur.readByEmail(email);

        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }

        const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
        if (isPasswordValid) {
            res.status(200).json({ success: true, message: `Bienvenue ${user.nom_user}`, id_user: user.id_user });
        } else {
            res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
    }

    
    async updatePassword(req, res) {
        const { id_user, mdp } = req.body;

        try {
            const hashedPwd = await bcrypt.hash(mdp, 10);
            const success = await this.contributeur.updateMdp(id_user, hashedPwd);
            if (success) {
                res.status(200).json({ success: true, message: "Mot de passe mis à jour avec succès." });
            } else {
                res.status(400).json({ success: false, message: "Échec de la mise à jour du mot de passe." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    async delete(req, res) {
        const { id_user } = req.body;

        const success = await this.contributeur.deleteUser(id_user);
        if (success) {
            res.status(200).json({ success: true, message: "Contributeur supprimé avec succès." });
        } else {
            res.status(400).json({ success: false, message: "Échec de la suppression du contributeur." });
        }
    }
}

export default ContributeurController;
