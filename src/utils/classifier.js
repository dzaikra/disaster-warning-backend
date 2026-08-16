const {

    AMAN,

    WASPADA,

    SIAGA,

    BAHAYA,

} = require("../constants/risk.constant");

// ==========================
// Risk Classification
// ==========================

const classifyRisk = (score) => {

    if (score < 0.25) {

        return AMAN;

    }

    if (score < 0.50) {

        return WASPADA;

    }

    if (score < 0.75) {

        return SIAGA;

    }

    return BAHAYA;

};

module.exports = {

    classifyRisk,

};