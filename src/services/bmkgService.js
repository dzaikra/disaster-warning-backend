const axios = require("axios");
const prisma = require("../config/prisma");

const {
    parseEarthquakeData,
} = require("../utils/earthquakeParser");

const {
    BMKG_AUTOGEMPA_URL,
} = require("../constants/bmkg.constant");

// ==========================
// Fetch Earthquake BMKG
// ==========================

const fetchEarthquake = async () => {

    try {

        const response =
            await axios.get(
                BMKG_AUTOGEMPA_URL
            );

        const gempa =
            response?.data?.Infogempa?.gempa;

        if (!gempa) {

            throw new Error(
                "Data gempa tidak ditemukan."
            );

        }

        const earthquakeData =
            parseEarthquakeData(
                gempa
            );

        const earthquake =
            await prisma.earthquake.upsert({

                where: {

                    bmkgId:
                        earthquakeData.bmkgId,

                },

                update: {},

                create:
                    earthquakeData,

            });
            logger.info(

            `BMKG Updated | Magnitude=${earthquake.magnitude} | Location=${earthquake.location}`

            );

        return earthquake;

    } catch (error) {

        console.error(
            "BMKG Service Error:",
            error.message
        );

        throw error;

    }

};

module.exports = {

    fetchEarthquake,

};