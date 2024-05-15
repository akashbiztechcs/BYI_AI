const { generateQuotes } = require("../controller/gemini.controller");
const { verifyAPI } = require("../middleware/APIVerification");
const { createModel } = require("../middleware/createModel");


const router = require("express").Router();



router.post("/generate-quotes", verifyAPI, createModel, generateQuotes)

module.exports = router