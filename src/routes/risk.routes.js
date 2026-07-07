const express = require("express");

const router = express.Router();

const riskController = require(
    "../controllers/risk.controller"
);

const {
    authenticate,
} = require("../middleware/auth.middleware");

router.post(
    "/analyze",
    authenticate,
    riskController.analyzeRisk
);

module.exports = router;