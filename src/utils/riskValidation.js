const {

    AMAN,

    WASPADA,

    SIAGA,

    BAHAYA,

} = require("../constants/risk.constant");

const {

    DISTANCE,

    MAGNITUDE,

} = require("../constants/riskRule.constant");

// ==========================
// Decision Matrix Validation
// ==========================

const validateRiskLevel = (

    distance,

    magnitude,

    sawRisk

) => {

    // ==========================
    // FAR ZONE
    // ==========================

    if (

        distance >= DISTANCE.FAR

    ) {

        return AMAN;

    }

    // ==========================
    // MEDIUM ZONE
    // ==========================

    if (

        distance >= DISTANCE.MEDIUM &&

        distance < DISTANCE.FAR

    ) {

        if (

            magnitude < MAGNITUDE.LOW

        ) {

            return AMAN;

        }

        return WASPADA;

    }

    // ==========================
    // NEAR ZONE
    // ==========================

    if (

        distance >= DISTANCE.NEAR &&

        distance < DISTANCE.MEDIUM

    ) {

        if (

            magnitude < MAGNITUDE.LOW

        ) {

            return WASPADA;

        }

        if (

            magnitude < MAGNITUDE.HIGH

        ) {

            return SIAGA;

        }

        return BAHAYA;

    }

    // ==========================
    // VERY NEAR
    // ==========================

    if (

        distance < DISTANCE.NEAR

    ) {

        if (

            magnitude >= MAGNITUDE.HIGH

        ) {

            return BAHAYA;

        }

        return SIAGA;

    }

    return sawRisk;

};

module.exports = {

    validateRiskLevel,

};