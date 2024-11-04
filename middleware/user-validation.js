export function validateUserUpdateTotal(req, res, next) {
    const { user_id, treasure_id } = req.body;

    // Check required fields
    if (!user_id || !treasure_id) {
        return res.status(400).send("All fields (user_id, treasure_id) are required!");
    }

    next();
}