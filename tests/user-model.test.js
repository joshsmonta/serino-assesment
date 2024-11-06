import { mysqlContainer, db, setupTestDatabase, teardownTestDatabase } from './setup.js';
import User from "../models/user.js";
import { describe, beforeEach, it, expect, beforeAll, afterAll } from "vitest";

describe("User Model", async () => {
    beforeAll(async () => {
        await setupTestDatabase(); // This will initialize the database
    });

    afterAll(async () => {
        await teardownTestDatabase(); // This will clean up after all tests
    });

    it('should be able to get user with id', async () => {
        const id = '3000'
        const user = await User.getUser(id)
        expect(user).toEqual(new User(3000, 'U1', 21, undefined, 'u1@kitra.abc', 0));
    })

    it('should be able to grab treasure using user_id and treasure_id', async () => {
        const user_id = '3000'
        const treasure_id = '1';
        const result = await User.grabTreasure(user_id, treasure_id)
        expect(result.success).toEqual(true)
    });

})