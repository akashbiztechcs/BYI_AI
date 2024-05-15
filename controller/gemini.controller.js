const { sendResponse } = require("../helper/commonFunction")
const { getQuotesData } = require("../helper/gemini.helper")

module.exports = {
    generateQuotes: async (req,res) => {
        try {

            console.log('Inside >> generateQuotes');
            const { topic, format } = req.body
            const geminiModel = req.geminiModel

            const generatedQuotes = await getQuotesData(geminiModel, topic, format)

            sendResponse(res, 200, "Quotes generated successfully", generatedQuotes)
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    }
}