const riskResultService =
require("../services/riskResult.service");

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

        return res.status(200).json({

            success: true,

            data: history,

        });

    } catch (error) {

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

        const result =
            await riskResultService.getRiskDetail(

                riskResultId,

                userId

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