import { mysqlContainer, db, setupTestDatabase, teardownTestDatabase } from './setup.js';
import Treasure from "../models/treasure";
import { describe, beforeEach, it, expect, beforeAll, afterAll } from "vitest";

describe('Treasure Model', async () => {
    beforeAll(async () => {
        await setupTestDatabase(); // This will initialize the database
    });

    afterAll(async () => {
        await teardownTestDatabase(); // This will clean up after all tests
    });

    it('check if Treasure instance properties are correct', () => {
        const id = 1;
        const name = 'test';
        const latitude = 38.8951;
        const longitude = -77.0364;
        const treasure = new Treasure(id, name, latitude, longitude);
        expect(treasure).toEqual(new Treasure(id, name, latitude, longitude))
    })
    it('get all treasures from database', async () => {
        const treasures = await Treasure.getAllTreasures();
        expect(treasures).toHaveLength(2);
        expect(treasures[0]).toEqual(new Treasure(1, 'Golden Coin', '14.5520', '121.0170'));
        expect(treasures[1]).toEqual(new Treasure(2, 'Silver Ring', '14.5520', '121.0170'));
    })
    it('get all treasures with value <= specified amount', async () => {
        const amount = 20;
        const treasures = await Treasure.getTreasuresWithValue(amount);
        expect(treasures).toEqual([
            expect.objectContaining({ name: 'Golden Coin', amount: 15 }),
            expect.objectContaining({ name: 'Silver Ring', amount: 5 })
        ]);
    })
    it('should use the default amount (10) if none is specified', async () => {
        const treasures = await Treasure.getTreasuresWithValue();

        // Expected output: Only "Silver Ring" since only it has a minimum amount <= 10
        expect(treasures).toEqual([
            expect.objectContaining({ name: 'Silver Ring', amount: 5 })
        ]);
    });
})