const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    discordSalaiToken: {
        type: String,
        trim: true
    },
    discardServerId: {
        type: String,
        trim: true
    },
    discardChannelId: {
        type: String,
        trim: true
    },
    googleApiKey: {
        type: String,
        trim: true
    },
    origin: {
        type: String,
        trim: true
    }
})

const Credential = mongoose.model('credentials', credentialSchema);
module.exports = Credential