const { generateImage } = require("../controller/midjourney.controller");
const { verifyAPI } = require("../middleware/APIVerification");
const { createClient } = require("../middleware/createClient");


const router = require("express").Router();



router.post("/generate-image", verifyAPI, createClient, generateImage)

module.exports = router