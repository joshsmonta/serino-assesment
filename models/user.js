import Database from "../database.js";

export default class User {
    constructor(id, name, age, password, email, total) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
        this.total = total;
    }

    static async getUser(id) {
        const db = new Database();
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.pool.query(query, [id]);
        if (rows.length === 0) {
            return null; // or throw an error, depending on how you want to handle not found cases
        }
        const row = rows[0];
        return new User(row.id, row.name, row.email, row.age, row.total);
    }

    static async grabTreasure(user_id, treasure_id) {
        const db = new Database();
        // Step 1: Fetch the sum of the money values for the specified treasure
        const moneyQuery = `
            SELECT SUM(amt) AS total_amt
            FROM money_values
            WHERE treasure_id = ?
        `;
        const [moneyRows] = await db.pool.query(moneyQuery, [treasure_id]);
        // Check if there’s a valid sum, otherwise return or throw an error
        if (moneyRows.length === 0 || !moneyRows[0].total_amt) {
            return { success: false, message: "treasure id not valid or amount not valid, please check." };
        }
        const totalAmt = moneyRows[0].total_amt;
        // Step 2: Update the user's total with the summed amount
        const updateUserQuery = `
            UPDATE users
            SET total = total + ?
            WHERE id = ?
        `;
        const [updateResult] = await db.pool.query(updateUserQuery, [totalAmt, user_id]);

        return { success: true, message: updateResult };
    }
}