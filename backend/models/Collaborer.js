import Model from './Model.js';

class Collaborer extends Model {
    constructor() {
        super();
    }

    async ajouter(idProjet, idContributeur) {
        const sql = "INSERT INTO collaborer (id_projet, id_contributeur) VALUES (?, ?)";
        const result = await this.db.query(sql, [idProjet, idContributeur]);
        return result.affectedRows > 0;
    }
    async assignCollaboratorsToTask(id_tache, collaborateurs) {
    const values = collaborateurs.map(id => `(${id}, ${id_tache})`).join(', ');
    const sql = `INSERT INTO effectuer (id_contributeur, id_tache) VALUES ${values}`;
    const result = await this.db.query(sql);
    return result.affectedRows > 0;
}

    async read() {
        const sql = "SELECT * FROM collaborer";
        return await this.db.query(sql);
    }

    async delete(idCollab) {
        const sql = "DELETE FROM collaborer WHERE id_collaborer = ?";
        const result = await this.db.query(sql, [idCollab]);
        return result.affectedRows > 0;
    }

    async readCollaborateursByProject(id_projet) {
        const sql = `
            SELECT 
                c.id_collaborer,
                ctr.id_contributeur,
                ctr.nom,
                ctr.email,
                ctr.type
            FROM collaborer c
            JOIN contributeur ctr ON c.id_contributeur = ctr.id_contributeur
            WHERE c.id_projet = ?
        `;
        return await this.db.query(sql, [id_projet]);
    }

}

export default Collaborer;
