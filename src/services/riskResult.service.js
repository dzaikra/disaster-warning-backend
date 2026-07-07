const prisma = require("../config/prisma");

// ==========================
// Save Risk Result
// ==========================

const saveRiskResult = async (data) => {

    return await prisma.riskResult.create({

        data: {

            userId: data.userId,

            earthquakeId: data.earthquakeId,

            distance: data.distance,

            fuzzyDistance: data.fuzzy.distance,

            fuzzyMagnitude: data.fuzzy.magnitude,

            fuzzyDepth: data.fuzzy.depth,

            sawScore: data.sawScore,

            riskLevel: data.riskLevel,

        },

    });

};

// ==========================
// Get Risk History
// ==========================

const getRiskHistory = async (userId) => {

    return await prisma.riskResult.findMany({

        where: {

            userId,

        },

        include: {

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

const getRiskDetail = async (
    riskResultId,
    userId
) => {

    return await prisma.riskResult.findFirst({

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