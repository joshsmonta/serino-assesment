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
        const query = `SELECT * FROM users WHERE id = ${id}`;
        const [rows] = await db.query(query);
        if (rows.length === 0) {
            return null; // or throw an error, depending on how you want to handle not found cases
        }
        const row = rows[0];
        return new User(row.id, row.name, row.age, undefined, row.email, row.total);
    }

    static async grabTreasure(user_id, treasure_id) {
        const db = new Database();
        // Step 1: Fetch the sum of the money values for the specified treasure
        const moneyQuery = `
            SELECT SUM(amt) AS total_amt
            FROM money_values
            WHERE treasure_id = ${treasure_id}
        `;
        const [moneyRows] = await db.query(moneyQuery);
        // Check if there’s a valid sum, otherwise return or throw an error
        if (moneyRows.length === 0 || !moneyRows[0].total_amt) {
            return { success: false, message: "treasure id not valid or amount not valid, please check." };
        }
        const totalAmt = moneyRows[0].total_amt;
        // Step 2: Update the user's total with the summed amount
        const updateUserQuery = `
            UPDATE users
            SET total = total + ${totalAmt}
            WHERE id = ${user_id}
        `;
        const [updateResult] = await db.query(updateUserQuery);
        if (updateResult.length === 0) {
            return { success: false, message: "treasure id not valid or amount not valid, please check." };
        }
        return { success: true, message: updateResult };
    }
}