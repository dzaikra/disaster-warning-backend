const prisma = require("../config/prisma");

// ==========================
// Save Risk Result
// ==========================

const saveRiskResult = (data) => {

    if (!data.userId) {
        throw new Error("User ID is required.");
    }

    if (!data.earthquakeId) {
        throw new Error("Earthquake ID is required.");
    }

    return prisma.riskResult.create({

        data: {

            userId:
                data.userId,

            earthquakeId:
                data.earthquakeId,

            distance:
                data.distance,

            fuzzyDistance:
                data.fuzzy.distance,

            fuzzyMagnitude:
                data.fuzzy.magnitude,

            fuzzyDepth:
                data.fuzzy.depth,

            sawScore:
                data.sawScore,

            riskLevel:
                data.riskLevel,

        },

    });

};

// ==========================
// Get Risk History
// ==========================

const getRiskHistory = (userId) => {

    return prisma.riskResult.findMany({

        where: {

            userId,

        },

        select: {

            id: true,

            distance: true,

            sawScore: true,

            riskLevel: true,

            createdAt: true,

            earthquake: {

                select: {

                    id: true,

                    eventDate: true,

                    eventTime: true,

                    location: true,

                    magnitude: true,

                    depth: true,

                    latitude: true,

                    longitude: true,

                    shakemapUrl: true,

                },

            },

        },

        orderBy: {

            createdAt: "desc",

        },

    });

};

// ==========================
// Get Risk Detail
// ==========================

const getRiskDetail = (
    riskResultId,
    userId
) => {

    return prisma.riskResult.findFirst({

        where: {

            id: riskResultId,

            userId,

        },

        include: {

            earthquake: true,

        },

    });

};

module.exports = {

    saveRiskResult,

    getRiskHistory,

    getRiskDetail,

};