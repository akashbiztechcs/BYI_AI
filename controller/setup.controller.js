const { sendResponse } = require("../helper/commonFunction");
const Credential = require("../schema/credential.model");

module.exports = {
    setupCredentials: async (req, res) => {
        try {
            const credentialsData = req.body
            const credentials = new Credential({...credentialsData, origin : req.headers.origin})
            const savedCredentials = await credentials.save();

            sendResponse(res, 200, "Credentials saved successfully", { apiKey: savedCredentials._id })
        } catch (error) {
            sendResponse(res, 500, error, null)
        }
    }
}