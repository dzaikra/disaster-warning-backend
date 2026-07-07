const express =
    require("express");

const router =
    express.Router();

const {
    getLatestEarthquake,
} = require(
    "../controllers/earthquakeController"
);

router.get(
    "/fetch",
    getLatestEarthquake
);

module.exports = router;