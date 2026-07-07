const haversineDistance = (
    userLat,
    userLng,
    quakeLat,
    quakeLng
) => {
    const R = 6371; // radius bumi (km)

    const toRadians = (degree) => {
        return degree * (Math.PI / 180);
    };

    const dLat = toRadians(quakeLat - userLat);
    const dLng = toRadians(quakeLng - userLng);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(userLat)) *
            Math.cos(toRadians(quakeLat)) *
            Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return Number((R * c).toFixed(2));
};

module.exports = {
    haversineDistance,
};