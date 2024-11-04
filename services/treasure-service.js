import Treasure from "../models/treasure.js";
import { calculateDistance } from '../utils/geospatial.js';

export async function findTreasuresWithDistance(latitude, longitude, distance) {
    try {
        const treasures = await Treasure.getAllTreasures();
        return treasures.filter(treasure => {
            const dist = calculateDistance(parseFloat(treasure.latitude), parseFloat(treasure.longitude), parseFloat(latitude), parseFloat(longitude));
            return dist <= distance;
        });
    } catch (error) {
        console.error(error);
        return [{ "message": "an error occurred inside findTreasureWithDistance()" }];
    }
}

// Endpoint B: Find treasures with a prize value
export async function findTreasuresWithPrizeValue(latitude, longitude, distance, prize_value) {
    try {
        const treasures = await Treasure.getTreasuresWithValue(prize_value);
        return treasures.filter(treasure => {
            const dist = calculateDistance(parseFloat(treasure.latitude), parseFloat(treasure.longitude), parseFloat(latitude), parseFloat(longitude));
            return dist <= distance;
        });
    } catch (error) {
        console.error(error);
        return [{ "message": "an error occurred inside findtreasuresWithPrizeValue()" }];
    }
}