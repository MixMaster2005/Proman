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

    async read() {
        const sql = "SELECT * FROM collaborer";
        return await this.db.query(sql);
    }

    async delete(idCollab) {
        const sql = "DELETE FROM collaborer WHERE id_collaborer = ?";
        const result = await this.db.query(sql, [idCollab]);
        return result.affectedRows > 0;
    }
}

export default Collaborer;
