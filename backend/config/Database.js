import mysql from "mysql2/promise"; // Utilisation de mysql2 avec Promises

class Database {
    constructor() {
        this.connection = null;
    }

    async init() {
        if (!this.connection) {
            try {
                this.connection = await mysql.createConnection({
                    host: "localhost",
                    port: 8080,
                    user: "root",
                    password: "",
                    database: "proman"
                });
                console.log("✅ MySQL connecté !");
            } catch (err) {
                console.error("❌ Erreur de connexion à MySQL :", err);
                process.exit(1); // Quitte l'application si erreur critique
            }
        }
    }

    async query(sql, args = []) {
        if (!this.connection) await this.init(); // S'assurer que la connexion est bien initialisée
        try {
            const [results] = await this.connection.execute(sql, args);
            return results;
        } catch (err) {
            console.error("❌ Erreur SQL :", err);
            throw err;
        }
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
            console.log("✅ Connexion MySQL fermée !");
        }
    }
}

const db = new Database();
await db.init(); // On s'assure que la connexion est bien active avant export
export default db;
