import Model from './Model.js';

class Contributeur extends Model {
    constructor() {
        super();
    }

    async create(nom, email, mdp, type) {
        const sql = "INSERT INTO contributeur (nom, email, mdp, type) VALUES (?, ?, ?, ?)";
        const result = await this.db.query(sql, [nom, email, mdp, type]);
        return result.affectedRows > 0;
    }

    async read() {
        const sql = "SELECT * FROM contributeur";
        return await this.db.query(sql);
    }

    async readById(id) {
        const sql = "SELECT * FROM contributeur WHERE id_contributeur = ?";
        const result = await this.db.query(sql, [id]);
        return result.length ? result[0] : null;
    }

    async readByEmail(email) {
        const sql = "SELECT * FROM contributeur WHERE email = ?";
        const result = await this.db.query(sql, [email]);
        return result.length ? result[0] : null;
    }

    async updateMdp(id, mdp) {
        const sql = "UPDATE contributeur SET mdp = ? WHERE id_contributeur = ?";
        const result = await this.db.query(sql, [mdp, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const sql = "DELETE FROM contributeur WHERE id_contributeur = ?";
        const result = await this.db.query(sql, [id]);
        return result.affectedRows > 0;
    }
}

export default Contributeur;
