const {
    getRiskDescription,
} = require("../utils/riskDescription");

const {

    DISTANCE_WEIGHT,

    MAGNITUDE_WEIGHT,

    DEPTH_WEIGHT,

} = require("../constants/weight.constant");

const toResponse = (
    analysis,
    riskResultId
) => {

    return {

        riskResultId,

        earthquakeId:
            analysis.earthquake.id,

        eventDate:
            analysis.earthquake.eventDate,

        eventTime:
            analysis.earthquake.eventTime,

        location:
            analysis.earthquake.location,

        latitude:
            analysis.earthquake.latitude,

        longitude:
            analysis.earthquake.longitude,

        magnitude:
            analysis.earthquake.magnitude,

        depth:
            analysis.earthquake.depth,

        felt:
            analysis.earthquake.felt,

        potential:
            analysis.earthquake.potential,

        shakemap:
            analysis.earthquake.shakemapUrl,

        distance:
            Number(
                analysis.distance.toFixed(2)
            ),

        fuzzy: {

            magnitude:
                Number(
                    analysis.fuzzy.magnitude.toFixed(4)
                ),

            distance:
                Number(
                    analysis.fuzzy.distance.toFixed(4)
                ),

            depth:
                Number(
                    analysis.fuzzy.depth.toFixed(4)
                ),

        },

        weights: {

            distance: DISTANCE_WEIGHT,

            magnitude: MAGNITUDE_WEIGHT,

            depth: DEPTH_WEIGHT,

        },
        
        sawScore:
            Number(
                analysis.sawScore.toFixed(4)
            ),

        riskLevel:
            analysis.riskLevel,

        description:
            getRiskDescription(
                analysis.riskLevel
            ),

    };

};

module.exports = {

    toResponse,

};