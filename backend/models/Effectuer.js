import Model from './Model.js';

class Effectuer extends Model {
    constructor() {
        super();
    }

    async assigner(idContributeur, idTache) {
        const sql = "INSERT INTO effectuer (id_contributeur, id_tache) VALUES (?, ?)";
        const result = await this.db.query(sql, [idContributeur, idTache]);
        return result.affectedRows > 0;
    }

    async read() {
        const sql = "SELECT * FROM effectuer";
        return await this.db.query(sql);
    }

    async delete(idEff) {
        const sql = "DELETE FROM effectuer WHERE id_eff = ?";
        const result = await this.db.query(sql, [idEff]);
        return result.affectedRows > 0;
    }
}

export default Effectuer;
