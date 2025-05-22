import Model from './Model.js';

class TachesAnterieures extends Model {
    constructor() {
        super();
    }

    async ajouterDependance(idTache, idTacheAnterieure) {
        const sql = "INSERT INTO taches_anterieures (id_tache, id_tache_anterieure) VALUES (?, ?)";
        const result = await this.db.query(sql, [idTache, idTacheAnterieure]);
        return result.affectedRows > 0;
    }

    async read() {
        const sql = "SELECT * FROM taches_anterieures";
        return await this.db.query(sql);
    }
    async readByTache(id_tache) {
        const sql = "SELECT * FROM taches_anterieures WHERE id_tache = ?";
        const [rows] = await this.db.query(sql, [id_tache]);
        return rows;
    }

    async delete(idAnt) {
        const sql = "DELETE FROM taches_anterieures WHERE id_ant = ?";
        const result = await this.db.query(sql, [idAnt]);
        return result.affectedRows > 0;
    }
}

export default TachesAnterieures;
