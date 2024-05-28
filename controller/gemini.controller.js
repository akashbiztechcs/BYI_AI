const { sendResponse } = require("../helper/commonFunction")
const { getQuotesData, getQuotesDataV2, getTagName } = require("../helper/gemini.helper")

module.exports = {
    generateQuotes: async (req,res) => {
        try {
            const { topic, format } = req.body
            const geminiModel = req.geminiModel

            const generatedQuotes = await getQuotesData(geminiModel, topic, format)

            if(!generatedQuotes) sendResponse(res, 400, "Something went wrong", null)

            sendResponse(res, 200, "Quotes generated successfully", generatedQuotes)
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    },
    generateQuotesV2: async (req,res) => {
        try {
            const geminiModel = req.geminiModel

            // const generatedQuotes = await getQuotesDataV2(geminiModel, req.body)
            const [generatedQuotes, tagName] = await Promise.all([
                getQuotesDataV2(geminiModel, req.body),
                getTagName(geminiModel, req.body.topic)
            ])
            if(!generatedQuotes || !tagName) sendResponse(res, 400, "Something went wrong", null)

            // sendResponse(res, 200, "Quotes generated successfully", generatedQuotes)
            sendResponse(res, 200, "Quotes generated successfully", {generatedQuotes, tagName})
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    }
}