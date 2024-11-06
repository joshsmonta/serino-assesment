import { MySqlContainer } from '@testcontainers/mysql';
import Database from "../database";

export const mysqlContainer = await new MySqlContainer().start();
export const db = await new Database(mysqlContainer.getConnectionUri());

export const setupTestDatabase = async () => {

    await db.query(`
        CREATE TABLE treasures (
            id INT NOT NULL PRIMARY KEY,
            latitude DECIMAL(12, 4),
            longitude DECIMAL(12, 4),
            name VARCHAR(100)
        );
    `);
    await db.query(`
        CREATE TABLE money_values (
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            treasure_id INT,
            amt INT,
            FOREIGN KEY (treasure_id) REFERENCES treasures(id)
        );
    `);
    await db.query(`
        CREATE TABLE users (id INT NOT NULL PRIMARY KEY, name VARCHAR(100), age INT, password VARCHAR(255), email VARCHAR(100), total INT DEFAULT 0);
    `);
    await db.query(`
        INSERT INTO users (id, name, age, password, email)
        VALUES
        (3000, 'U1', 21, '123123', 'u1@kitra.abc'),
        (3001, 'U2', 51, '234234', 'u2@kitra.abc'),
        (3002, 'U3', 31, '345345', 'u3@kitra.abc'),
        (3003, 'U4', 18, '456456', 'u4@kitra.abc'),
        (3004, 'U5', 21, '567567', 'u5@kitra.abc'),
        (3005, 'U6', 35, '678678', 'u6@kitra.abc');
    `);
    await db.query(`INSERT INTO treasures (id, name, latitude, longitude) VALUES
        (1, 'Golden Coin', 14.552036, 121.016961),
        (2, 'Silver Ring', 14.552036, 121.016962)`);
    await db.query(`INSERT INTO money_values (id, treasure_id, amt) VALUES
        (1, 1, 15),
        (2, 1, 25),
        (3, 2, 5),
        (4, 2, 10)`);
};

export const teardownTestDatabase = async () => {
    await db.close();
    await mysqlContainer.stop();
};

