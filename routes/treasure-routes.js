import express from 'express';
import { findTreasuresWithDistance, findTreasuresWithPrizeValue } from '../services/treasure-service.js'
import { validateTreasureQuery, validatePrizeValue } from '../middleware/treasure-validation.js';

const router = express.Router();


// Endpoint A: Find treasures within a specified distance
router.get('/treasures', validateTreasureQuery, async (req, res) => {
    const { latitude, longitude, distance } = req.query;
    const result = await findTreasuresWithDistance(latitude, longitude, distance);
    return res.status(200).send(result);
});
router.get('/treasures/prize', [validateTreasureQuery, validatePrizeValue], async (req, res) => {
    const { latitude, longitude, distance, prize_value } = req.query;
    const result = await findTreasuresWithPrizeValue(latitude, longitude, distance, prize_value);
    return res.status(200).send(result);
});

export default router;