import bcryptjs from "bcryptjs";
import Contributeur from "../models/Contributeur.js";

class ContributeurController {
    constructor() {
        this.contributeur = new Contributeur();
    }

    async signup(req, res) {
        const { nom, email, mdp, type } = req.body;

        try {
            const hashedPwd = await bcryptjs.hashSync(mdp, 10);
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

        const isPasswordValid = await bcrypt.compareSync(mdp, user.mdp);
        if (isPasswordValid) {
            res.status(200).json({ success: true, message: `Bienvenue ${user.nom_user}`, id_user: user.id_user });
        } else {
            res.status(401).json({ error: "Email ou mot de passe incorrect." });
        }
    }
    async getContributeurByEmail(req, res) {
        const { email } = req.params; // Récupère l'email depuis les paramètres de la requête
    
        try {
            const user = await this.contributeur.readByEmail(email); // Appelle la méthode du modèle
            if (user) {
                res.status(200).json(user); // Retourne les informations du contributeur
            } else {
                res.status(404).json({ error: "Contributeur non trouvé." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur." });
        }
    }

    
    /*async updatePassword(req, res) {
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
    }*/

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
