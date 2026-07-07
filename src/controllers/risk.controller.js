const riskService = require(
    "../services/risk.service"
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
        // Ambil User ID dari JWT
        // ==========================

        const userId =
            req.user.id;

        const result =
            await riskService.analyzeRisk(

                userId,

                earthquakeId,

                userLatitude,

                userLongitude

            );

        return res.status(200).json({

            success: true,

            data: result,

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