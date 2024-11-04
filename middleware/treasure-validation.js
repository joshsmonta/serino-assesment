export function validateTreasureQuery(req, res, next) {
    const { latitude, longitude, distance } = req.query;

    // Check required fields
    if (!latitude || !longitude || !distance) {
        return res.status(400).send("All fields (latitude, longitude, distance) are required!");
    }

    // Check distance validity
    const dist = parseInt(distance, 10);
    if (![1, 10].includes(dist)) {
        return res.status(400).send("Distance must be either 1km or 10km only.");
    }

    // Check latitude and longitude are numbers
    if (isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
        return res.status(400).send("Latitude and longitude must be valid numbers.");
    }
    next();
}

export function validatePrizeValue(req, res, next) {
    const { prize_value } = req.query;
    if (prize_value) {
        const prize = parseInt(prize_value);
        if (isNaN(prize) || prize < 10 || prize > 30 || !Number.isInteger(prize)) {
            return res.status(400).send("Prize value must be a whole number between $10 and $30.");
        }
    }
    next();
}
