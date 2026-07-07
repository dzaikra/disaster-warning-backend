const {
    fetchEarthquake,
} = require("../services/bmkgService");

const getLatestEarthquake =
    async (req, res) => {

        try {

            const earthquake =
                await fetchEarthquake();

            return res.status(200).json({
                success: true,
                data: earthquake,
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

module.exports = {
    getLatestEarthquake,
};