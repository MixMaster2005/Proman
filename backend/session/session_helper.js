import jwt from 'jsonwebtoken'; //Tsy izy elaaaaaaaaaaaaa
import bcrypt from 'bcrypt';// AIZA elaaaaaaaaaaaaa
import Contributeur from '../models/Contributeur.js';
import config from '../config/config.js';

class SessionContributeur {
    static async login(req, res) {
        console.log("🔹 Requête reçue :", req.body);

        const { email, mdp } = req.body;
        if (!email || !mdp) {
            console.log("❌ Email ou mot de passe manquant !");
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        try {
            const contributeurModel = new Contributeur();
            const contributeur = await contributeurModel.readByEmail(email);

            if (!contributeur) {
                console.log("❌ Contributeur non trouvé :", email);
                return res.status(404).json({ message: "Contributeur non trouvé" });
            }

            const match = await bcrypt.compare(mdp, contributeur.mdp);
            if (!match) {
                console.log("❌ Mot de passe incorrect !");
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            console.log("✅ Connexion réussie pour :", email);
            const token = jwt.sign({ 
                id_contributeur: contributeur.id_contributeur, 
                email: contributeur.email, 
                type: contributeur.type 
            }, config.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ 
                message: "Connexion réussie", 
                token, 
                id_contributeur: contributeur.id_contributeur,
                type: contributeur.type // Ajout du type (ex. admin ou utilisateur normal)
            });
            
        } catch (err) {
            console.error("🚨 Erreur serveur :", err);
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
}

export default SessionContributeur;