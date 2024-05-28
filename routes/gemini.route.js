const { generateQuotes, generateQuotesV2 } = require("../controller/gemini.controller");
const { verifyAPI } = require("../middleware/APIVerification");
const { createModel } = require("../middleware/createModel");


const router = require("express").Router();



router.post("/generate-quotes", verifyAPI, createModel, generateQuotes)
router.post("/v2/generate-quotes", verifyAPI, createModel, generateQuotesV2)

module.exports = router