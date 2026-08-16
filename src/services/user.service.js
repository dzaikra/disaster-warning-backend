const prisma = require("../config/prisma");

// ==========================
// Update User Location
// ==========================

const updateLocation = async (

    userId,

    latitude,

    longitude

) => {

    if (

        latitude === undefined ||

        longitude === undefined

    ) {

        throw new Error(

            "Latitude and longitude are required."

        );

    }

    return prisma.user.update({

        where: {

            id: userId,

        },

        data: {

            latitude,

            longitude,

            lastLocationUpdate:
                new Date(),

        },

        select: {

            id: true,

            name: true,

            email: true,

            latitude: true,

            longitude: true,

            lastLocationUpdate: true,

        },

    });

};

module.exports = {

    updateLocation,

};