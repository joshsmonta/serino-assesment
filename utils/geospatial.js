export function calculateDistance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dlng = degreesToRadians(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
        Math.sin(dlng / 2) * Math.sin(dlng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (earthRadius * c);
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}