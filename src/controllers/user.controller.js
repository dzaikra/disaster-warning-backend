const userService = require(
    "../services/user.service"
);

const logger = require(
    "../utils/logger"
);

// ==========================
// Update User Location
// ==========================

const updateLocation = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const {

            latitude,

            longitude,

        } = req.body;

        const user =
            await userService.updateLocation(

                userId,

                latitude,

                longitude

            );

        logger.info(

            `Location Updated | User=${userId}`

        );

        return res.status(200).json({

            success: true,

            message:
                "Location updated successfully.",

            data: user,

        });

    } catch (error) {

        logger.error(

            `Update Location Error | ${error.message}`

        );

        return res.status(500).json({

            success: false,

            message:
                error.message,

        });

    }

};

module.exports = {

    updateLocation,

};