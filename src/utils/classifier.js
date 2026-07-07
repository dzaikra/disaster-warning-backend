const classifyRisk = (score) => {

    if (score >= 0 && score < 0.25) {
        return "AMAN";
    }

    if (score >= 0.25 && score < 0.50) {
        return "WASPADA";
    }

    if (score >= 0.50 && score < 0.75) {
        return "SIAGA";
    }

    if (score >= 0.75 && score <= 1) {
        return "BAHAYA";
    }

    return "TIDAK VALID";
};

module.exports = {
    classifyRisk,
};