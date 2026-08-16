const riskService = require(
    "../services/risk.service"
);

const riskResultService = require(
    "../services/riskResult.service"
);

const riskMapper = require(
    "../mappers/risk.mapper"
);

// ==========================
// Analyze Risk
// ==========================

const analyzeRisk = async (
    req,
    res
) => {

    try {

        const {

            earthquakeId,

            userLatitude,

            userLongitude,

        } = req.body;

        // ==========================
        // User dari JWT
        // ==========================

        const userId =
            req.user.id;

        // ==========================
        // Hitung DSS
        // ==========================

        const analysis =
            await riskService.analyzeRisk(

                userId,

                earthquakeId,

                userLatitude,

                userLongitude

            );

        // ==========================
        // Simpan Risk Result
        // ==========================

        const riskResult =
            await riskResultService.saveRiskResult({

                userId,

                earthquakeId:
                    analysis.earthquake.id,

                distance:
                    analysis.distance,

                fuzzy:
                    analysis.fuzzy,

                sawScore:
                    analysis.sawScore,

                riskLevel:
                    analysis.riskLevel,

            });

        // ==========================
        // Mapper Response
        // ==========================

        const response =
            riskMapper.toResponse(

                analysis,

                riskResult.id

            );

        return res.status(200).json({

            success: true,

            data: response,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    analyzeRisk,

};