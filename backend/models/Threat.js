const mongoose = require('mongoose')

const ThreatSchema = new mongoose.Schema({

    activity: Number,

    result: String,

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model(
    'Threat',
    ThreatSchema
)