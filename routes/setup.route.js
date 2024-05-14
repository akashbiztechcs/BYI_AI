const { setupCredentials } = require("../controller/setup.controller");


const router = require("express").Router();

router.post("/credentials", setupCredentials)

module.exports = router