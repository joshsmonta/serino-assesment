import express from 'express';
import { validateUserUpdateTotal } from '../middleware/user-validation.js';
import { grabTreasureService, getUser } from '../services/user-service.js';


const router = express.Router();

router.get('/user/:id', async (req, res) => {
    const user_id = req.params.id;
    const result = await getUser(user_id);
    return res.status(200).send(result);
})
router.put('/user-grab', validateUserUpdateTotal, async (req, res) => {
    const { user_id, treasure_id } = req.body;
    const result = await grabTreasureService(user_id, treasure_id);
    return res.status(200).send(result);
});


export default router;