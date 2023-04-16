const mongoose = require("mongoose");

const field = {
    origin: {
        type: String,
    },
    deviceToken: {
        type: String,
    },
    deviceSessionToken: {
        type: String,
    },
    appToken: {
        type: String,
    },
    userToken: {
        type: String,
    },
    sessionToken: {
        type: String,
    },
    userAgent: {
        type: Object,
    },
    ipAddress: {
        type: String,
    },
    source: {
        type: String,
    },
    requestMethod: {
        type: String,
    },
    requestedTo: {
        type: String,
    },
    endpoint: {
        type: String,
    },
    originalURL: {
        type: String,
    },
    request: {
        type: Object,
    },
    requestSizeInBytes: {
        type: String,
    },
    responseType: {
        type: String,
    },
    responseMessage: {
        type: Object,
    },
    response: {
        type: Object,
    },
    responseSizeInBytes: {
        type: String,
    },
    requestTime: {
        type: String,
    },
    responseTime: {
        type: String,
    },
    elapsedTime: {
        type: Number,
    },
    errorLog: {
        type: Object,
    },
    createdBy: {
        type: String,
    },

    // common field
    status: {
        // true or false
        type: Boolean,
    },
    existence: {
        // true or false
        type: Boolean,
    },
    createdBy: {
        // @relation
        type: String,
    },
};

const sysActivitySchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("SysActivity", sysActivitySchema);
