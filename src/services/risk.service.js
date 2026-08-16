const prisma = require("../config/prisma");

const {
    haversineDistance,
} = require("../utils/haversine");

const {
    fuzzyMagnitude,
    fuzzyDistance,
    fuzzyDepth,
} = require("../utils/fuzzy");

const {
    calculateSAW,
} = require("../utils/saw");

const {
    classifyRisk,
} = require("../utils/classifier");

const {
    validateRiskLevel,
} = require("../utils/riskValidation");

const logger =
require("../utils/logger");

// ==========================
// Analyze Risk
// ==========================

const analyzeRisk = async (
    userId,
    earthquakeId,
    userLatitude,
    userLongitude
) => {

    // ==========================
    // Validasi User
    // ==========================

    if (!userId) {

        throw new Error(
            "User authentication failed."
        );

    }

    // ==========================
    // Validasi Input
    // ==========================

    if (!earthquakeId) {

        throw new Error(
            "Earthquake ID is required."
        );

    }

    if (

        userLatitude === undefined ||

        userLongitude === undefined

    ) {

        throw new Error(

            "User latitude and longitude are required."

        );

    }

    // ==========================
    // Ambil Data Gempa
    // ==========================

    const earthquake =
        await prisma.earthquake.findUnique({

            where: {

                id: earthquakeId,

            },

        });

    if (!earthquake) {

        throw new Error(

            "Earthquake not found."

        );

    }

    // ==========================
    // Hitung Jarak Haversine
    // ==========================

    const distance =
        haversineDistance(

            userLatitude,

            userLongitude,

            earthquake.latitude,

            earthquake.longitude

        );

    // ==========================
    // Fuzzifikasi
    // ==========================

    const fuzzyMagnitudeValue =
        fuzzyMagnitude(

            earthquake.magnitude

        );

    const fuzzyDistanceValue =
        fuzzyDistance(

            distance

        );

    const fuzzyDepthValue =
        fuzzyDepth(

            earthquake.depth

        );

    // ==========================
    // Perhitungan SAW
    // ==========================

    const sawScore =
        calculateSAW({

            magnitude:
                fuzzyMagnitudeValue,

            distance:
                fuzzyDistanceValue,

            depth:
                fuzzyDepthValue,

        });

    // ==========================
    // Klasifikasi Risiko SAW
    // ==========================

    const sawRisk =
        classifyRisk(
            sawScore
        );

    // ==========================
    // Rule-Based Validation
    // ==========================

    const riskLevel =
        validateRiskLevel(

            distance,

            earthquake.magnitude,

            sawRisk

        );

        logger.info(

        `Risk Analysis | User=${userId} | Earthquake=${earthquake.id} | Distance=${distance.toFixed(2)} km | Score=${sawScore.toFixed(4)} | Risk=${riskLevel}`

        );

    // ==========================
    // Return Analysis
    // ==========================

    return {

        earthquake,

        distance,

        fuzzy: {

            magnitude:
                fuzzyMagnitudeValue,

            distance:
                fuzzyDistanceValue,

            depth:
                fuzzyDepthValue,

        },

        sawScore,

        riskLevel,

    };

};

module.exports = {

    analyzeRisk,

};