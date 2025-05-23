import Model from './Model.js';

class Projets extends Model {
    constructor() {
        super();
    }

    async create(nom, dateDebut) {
        const sql = "INSERT INTO projets (nom_projet, date_debut) VALUES (?, ?)";
        const result = await this.db.query(sql, [nom, dateDebut]);
        return result.affectedRows > 0;
    }

    async read() {
        const sql = "SELECT * FROM projets";
        return await this.db.query(sql);
    }

    async readById(id) {
        const sql = "SELECT * FROM projets WHERE id_projet = ?";
        const result = await this.db.query(sql, [id]);
        return result.length ? result[0] : null;
    }

    async update(id, nom, dateDebut) {
        const sql = "UPDATE projets SET nom_projet = ?, date_debut = ? WHERE id_projet = ?";
        const result = await this.db.query(sql, [nom, dateDebut, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const sql = "DELETE FROM projets WHERE id_projet = ?";
        const result = await this.db.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default Projets;
