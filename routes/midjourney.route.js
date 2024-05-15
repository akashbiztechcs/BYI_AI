const { generateImage, generateSingleImage } = require("../controller/midjourney.controller");
const { verifyAPI } = require("../middleware/APIVerification");
const { createClient } = require("../middleware/createClient");


const router = require("express").Router();



router.post("/generate-image", verifyAPI, createClient, generateImage)
router.post("/generate-single-image", verifyAPI, createClient, generateSingleImage)

module.exports = router