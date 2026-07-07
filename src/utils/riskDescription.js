const getRiskDescription = (
    riskLevel
) => {

    switch (riskLevel) {

        case "AMAN":
            return "Kondisi relatif aman. Tetap pantau informasi resmi dari BMKG.";

        case "WASPADA":
            return "Tingkatkan kewaspadaan terhadap kemungkinan dampak gempa.";

        case "SIAGA":
            return "Segera lakukan langkah mitigasi dan bersiap menuju lokasi aman apabila diperlukan.";

        case "BAHAYA":
            return "Segera lakukan evakuasi sesuai prosedur keselamatan dan ikuti arahan dari pihak berwenang.";

        default:
            return "-";
    }

};

module.exports = {
    getRiskDescription,
};