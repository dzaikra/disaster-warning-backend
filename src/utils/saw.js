const WEIGHTS = {
    distance: 0.50,
    magnitude: 0.30,
    depth: 0.20,
};

const calculateSAW = (fuzzy) => {
    const score =
        fuzzy.distance * WEIGHTS.distance +
        fuzzy.magnitude * WEIGHTS.magnitude +
        fuzzy.depth * WEIGHTS.depth;

    return Number(score.toFixed(4));
};

module.exports = {
    calculateSAW,
    WEIGHTS,
};