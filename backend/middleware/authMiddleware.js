import jwt from 'jsonwebtoken';
import config from '../config/config.js'; // Import des configurations
import Contributeur from '../models/Contributeur.js'; // Import du modèle Contributeur

const contributeurModel = new Contributeur();

async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token manquant ou mal formaté' });
    }

    // Extraire le token sans "Bearer "
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide ou expiré' });
        }

        try {
            // Vérifier si le contributeur existe dans la base de données via le modèle
            const contributeur = await contributeurModel.readById(decoded.id_contributeur);

            if (!contributeur) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }

            // Ajouter les infos de l'utilisateur dans req
            req.user = {
                id: contributeur.id_contributeur,
                email: contributeur.email,
                type: contributeur.type // 0 = utilisateur normal, 1 = admin
            };

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Erreur du serveur', error });
        }
    });
}

export default verifyToken;