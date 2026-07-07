const axios = require("axios");
const prisma = require("../config/prisma");

const {
    parseEarthquakeData,
} = require("../utils/earthquakeParser");

const BMKG_URL =
    "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";

const fetchEarthquake = async () => {
    try {
        const response =
            await axios.get(BMKG_URL);

        const gempa =
            response?.data?.Infogempa?.gempa;

        if (!gempa) {
            throw new Error(
                "Data gempa tidak ditemukan"
            );
        }

        const earthquakeData =
            parseEarthquakeData(gempa);

        const earthquake =
            await prisma.earthquake.upsert({
                where: {
                    bmkgId:
                        earthquakeData.bmkgId,
                },
                update: {},
                create: earthquakeData,
            });

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