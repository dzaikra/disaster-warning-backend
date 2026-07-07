const express = require("express");

const router =
express.Router();

const {

    authenticate,

} = require("../middleware/auth.middleware");

const riskResultController =
require("../controllers/riskResult.controller");

router.get(

    "/history",

    authenticate,

    riskResultController.getHistory

);

router.get(

    "/:id",

    authenticate,

    riskResultController.getDetail

);

module.exports = router;