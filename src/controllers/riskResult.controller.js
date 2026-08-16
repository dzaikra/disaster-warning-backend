const riskResultService = require(
    "../services/riskResult.service"
);

const logger = require("../utils/logger");

// ==========================
// Get Risk History
// ==========================

const getHistory = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const history =
            await riskResultService.getRiskHistory(
                userId
            );
        
        logger.info(
            `Risk History | User=${userId}`
        );

        return res.status(200).json({

            success: true,

            total: history.length,

            data: history,

        });

    } catch (error) {

        logger.error(

        `Risk History Error | ${error.message}`

    );


        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==========================
// Get Risk Detail
// ==========================

const getDetail = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const riskResultId =
            Number(req.params.id);

        // ==========================
        // Validasi Parameter
        // ==========================

        if (
            isNaN(riskResultId)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid Risk Result ID.",

            });

        }

        const result =
            await riskResultService.getRiskDetail(

                riskResultId,

                userId

            );
        
        logger.info(
            `Risk Detail | User=${userId} | RiskResult=${riskResultId}`
        );

        if (!result) {

            return res.status(404).json({

                success: false,

                message:
                    "Risk result not found.",

            });

        }

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

    getHistory,

    getDetail,

};