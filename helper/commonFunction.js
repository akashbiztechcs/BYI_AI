module.exports= {
    sendResponse: function (res, status, message, data) {
        res.status(status).json({ status, message, data })
    }
}