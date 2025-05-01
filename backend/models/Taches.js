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

    async delete(id) {
        const sql = "DELETE FROM taches WHERE id_tache = ?";
        const result = await this.db.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default Taches;
