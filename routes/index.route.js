const { generateQuotes } = require("../controller/gemini.controller");
const { sendResponse } = require("../helper/commonFunction");
const { verifyAPI } = require("../middleware/APIVerification");
const { createModel } = require("../middleware/createModel");


const router = require("express").Router();



router.get("/", (req, res)=>{
    sendResponse(res, 200, "Hello World")
})

module.exports = router