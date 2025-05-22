import Model from './Model.js';

class Taches extends Model {
    constructor() {
        super();
    }

    async create(libelle, duree, statut, idProjet) {
        const sql = "INSERT INTO taches (libelle, duree, statut, id_projet) VALUES (?, ?, ?, ?)";
        const result = await this.db.query(sql, [libelle, duree, statut, idProjet]);
        return result.affectedRows > 0;
    }

    async read() {
        const sql = "SELECT * FROM taches";
        return await this.db.query(sql);
    }

    async readById(id) {
        const sql = "SELECT * FROM taches WHERE id_tache = ?";
        const result = await this.db.query(sql, [id]);
        return result.length ? result[0] : null;
    }

    async update(id, libelle, duree, statut) {
        const sql = "UPDATE taches SET libelle = ?, duree = ?, statut = ? WHERE id_tache = ?";
        const result = await this.db.query(sql, [libelle, duree, statut, id]);
        return result.affectedRows > 0;
    }

    async updateStatut(id_tache, statut){
        const sql = "UPDATE taches SET statut = ? WHERE id_tache = ?";
        const result = await this.db.query(sql, [statut, id_tache]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const sql = "DELETE FROM taches WHERE id_tache = ?";
        const result = await this.db.query(sql, [id]);
        return result.affectedRows > 0;
    }

    async readByContributeur(id_contributeur){
        const sql = "SELECT * FROM taches t INNER JOIN effectuer e ON t.id_tache = e.id_tache WHERE e.id_contributeur = ?";
        return await this.db.query(sql, [id_contributeur]);
    }
    
    async readBystatut(statut, id_projet) {
        const sql = "SELECT * FROM taches t INNER JOIN projets p ON t.id_projet = p.id_projet WHERE statut = ? AND t.id_projet = ?";
        return await this.db.query(sql, [statut, id_projet]);
    }

    async readByProject(id_projet) {
        const sql = "SELECT * FROM taches WHERE id_projet = ?";
        return await this.db.query(sql, [id_projet]);
    }

    async readByProjetAndContributeur(id_projet, id_contributeur) {
        const sql = `
            SELECT * 
            FROM taches t
            INNER JOIN effectuer e ON t.id_tache = e.id_tache
            WHERE t.id_projet = ? AND e.id_contributeur = ?
        `;
        return await this.db.query(sql, [id_projet, id_contributeur]);
    }
    /*async readContributorsWithTasks(id_projet) {
        const sql = `
            SELECT 
                c.id_contributeur,
                c.nom AS nom_contributeur,
                c.email AS email_contributeur,
                t.id_tache,
                t.libelle AS libelle_tache,
                t.duree,
                t.statut
            FROM taches t
            INNER JOIN effectuer e ON t.id_tache = e.id_tache
            INNER JOIN contributeur c ON e.id_contributeur = c.id_contributeur
            WHERE t.id_projet = ?
            ORDER BY c.id_contributeur, t.id_tache;
        `;
        return await this.db.query(sql, [id_projet]);
    }*/
        async readTasksWithCollaborators(id_projet) {
            const sql = `
                SELECT 
                    t.id_tache,
                    t.libelle,
                    t.duree,
                    t.statut,
                    c.id_contributeur,
                    c.nom AS nom_contributeur
                FROM taches t
                LEFT JOIN effectuer e ON t.id_tache = e.id_tache
                LEFT JOIN contributeur c ON e.id_contributeur = c.id_contributeur
                WHERE t.id_projet = ?
                ORDER BY t.id_tache, c.id_contributeur;
            `;
            return await this.db.query(sql, [id_projet]);
        }
    
}

export default Taches;
