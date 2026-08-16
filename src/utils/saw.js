const {

    DISTANCE_WEIGHT,

    MAGNITUDE_WEIGHT,

    DEPTH_WEIGHT,

} = require("../constants/weight.constant");

// ==========================
// Calculate SAW
// ==========================

const calculateSAW = (fuzzy) => {

    const score =

        (fuzzy.distance * DISTANCE_WEIGHT) +

        (fuzzy.magnitude * MAGNITUDE_WEIGHT) +

        (fuzzy.depth * DEPTH_WEIGHT);

    return Number(
        score.toFixed(4)
    );

};

module.exports = {

    calculateSAW,

};