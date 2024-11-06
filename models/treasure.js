import Database from '../database.js';

class TreasureWithAmount {
    constructor(id, name, lat, lng, amount) {
        this.id = id;
        this.name = name;
        this.latitude = lat;
        this.longitude = lng;
        this.amount = amount
    }
}

class Treasure {
    constructor(id, name, lat, lng) {
        this.id = id;
        this.name = name;
        this.latitude = lat;
        this.longitude = lng;
    }

    static async getAllTreasures() {
        const db = new Database();
        const [rows] = await db.query('SELECT * FROM treasures');
        return rows.map(row => new Treasure(row.id, row.name, row.latitude, row.longitude));
    }

    static async getTreasuresWithValue(amount) {
        const db = new Database();
        // Set a default value of 10 if amount is null or undefined
        const amountValue = amount ?? 10;
        const query = `
            SELECT t.id, t.name, t.latitude, t.longitude, m.id AS money_id, m.amt AS amount
            FROM treasures AS t
            JOIN money_values AS m ON t.id = m.treasure_id
            JOIN (
                SELECT treasure_id, MIN(amt) AS min_amt
                FROM money_values
                GROUP BY treasure_id
            ) AS min_values ON m.treasure_id = min_values.treasure_id AND m.amt = min_values.min_amt
            WHERE m.amt <= ${amountValue};
        `;
        const [rows] = await db.query(query);

        return rows.map(row => new TreasureWithAmount(row.id, row.name, row.latitude, row.longitude, row.amount));
    }
}

export default Treasure;