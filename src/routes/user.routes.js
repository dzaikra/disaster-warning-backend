const express = require("express");

const router = express.Router();

const userController = require(
    "../controllers/user.controller"
);

const {
    authenticate,
} = require(
    "../middleware/auth.middleware"
);

router.put(

    "/location",

    authenticate,

    userController.updateLocation

);

module.exports = router;