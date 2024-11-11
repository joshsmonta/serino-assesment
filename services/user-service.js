import User from "../models/user.js";

export async function grabTreasureService(user_id, treasure_id) {
    try {
        const result = await User.grabTreasure(user_id, treasure_id)
        if (result.success) {
            return result;
        } else {
            console.error(result.message);
            return [{ "message": result.message }];
        }
    } catch (error) {
        console.error(error);
        return [{ "message": "an error occurred inside grabTreasureService()" }];
    }
}

export async function getUser(user_id) {
    try {
        const result = await User.getUser(user_id)
        if (result.success) {
            return result
        } else {
            console.error(result.message);
            return [{ "message": result.message }];
        }
    } catch (err) {
        console.error(error);
        return [{ "message": "an error occurred inside grabTreasureService()" }];
    }
}