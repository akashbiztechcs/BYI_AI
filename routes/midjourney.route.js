const { generateImage, generateSingleImage, generateVariationImage, generateTestVariationImage, generateTestSingleImage } = require("../controller/midjourney.controller");
const { verifyAPI } = require("../middleware/APIVerification");
const { createClient } = require("../middleware/createClient");
const { createModel } = require("../middleware/createModel");


const router = require("express").Router();



router.post("/generate-image", verifyAPI, createClient, createModel, generateImage)
router.post("/generate-single-image", verifyAPI, createClient, generateSingleImage)
router.post("/generate-variation", verifyAPI, createClient, generateTestVariationImage)
router.post("/generate-single", verifyAPI, createClient, generateTestSingleImage)

module.exports = router