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
    getRiskDescription,
} = require("../utils/riskDescription");

const {
    saveRiskResult,
} = require("./riskResult.service");

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
    // Klasifikasi Risiko
    // ==========================

    const riskLevel =
        classifyRisk(
            sawScore
        );

    // ==========================
    // Simpan Risk Result
    // ==========================

    const riskResult =
    await saveRiskResult({

        userId,

        earthquakeId:
            earthquake.id,

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

    });

    // ==========================
    // Response
    // ==========================

    const result = {
        
        riskResultId:
            riskResult.id,

        earthquakeId:
            earthquake.id,

        eventDate:
            earthquake.eventDate,

        eventTime:
            earthquake.eventTime,

        location:
            earthquake.location,

        latitude:
            earthquake.latitude,

        longitude:
            earthquake.longitude,

        magnitude:
            earthquake.magnitude,

        depth:
            earthquake.depth,

        felt:
            earthquake.felt,

        potential:
            earthquake.potential,

        shakemap:
            earthquake.shakemapUrl,

        distance:
            Number(
                distance.toFixed(2)
            ),

        fuzzy: {

            magnitude:
                Number(
                    fuzzyMagnitudeValue.toFixed(4)
                ),

            distance:
                Number(
                    fuzzyDistanceValue.toFixed(4)
                ),

            depth:
                Number(
                    fuzzyDepthValue.toFixed(4)
                ),

        },

        weights: {

            distance: 0.50,

            magnitude: 0.30,

            depth: 0.20,

        },

        sawScore:
            Number(
                sawScore.toFixed(4)
            ),

        riskLevel,

        description:
            getRiskDescription(
                riskLevel
            ),

    };

    return result;

};

module.exports = {

    analyzeRisk,

};