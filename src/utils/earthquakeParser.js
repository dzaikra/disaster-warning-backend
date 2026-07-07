const parseEarthquakeData = (gempa) => {
    const [latitude, longitude] =
        gempa.Coordinates.split(",").map(Number);

    return {
                bmkgId: gempa.DateTime,

                magnitude: parseFloat(
                    gempa.Magnitude
                ),

                depth: parseFloat(
                    gempa.Kedalaman.replace(
                        " km",
                        ""
                    )
                ),

                latitude: parseFloat(
                    gempa.Coordinates.split(",")[0]
                ),

                longitude: parseFloat(
                    gempa.Coordinates.split(",")[1]
                ),

                location: gempa.Wilayah,

                potential: gempa.Potensi || null,

                felt: gempa.Dirasakan || null,

                shakemap: gempa.Shakemap || null,

                shakemapUrl: gempa.Shakemap
                    ? `https://data.bmkg.go.id/DataMKG/TEWS/${gempa.Shakemap}`
                    : null,

                eventDate: gempa.Tanggal || null,

                eventTime: gempa.Jam || null,

                earthquakeTime: new Date(
                    gempa.DateTime
                ),
            };
        };

module.exports = {
    parseEarthquakeData,
};