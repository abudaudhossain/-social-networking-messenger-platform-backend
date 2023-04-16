const mongoose = require("mongoose");

const field = {
    appToken: {
        type: String,
    },
    user: {
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
    startingDeviceToken: {
        type: String,
    },
    endingDeviceToken: {
        type: String,
    },
    endedAt: {
        // UTC Time
        type: Date,
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
    activityToken: {
        // @relation
        type: String,
    },
};

const sysSessionSchema = mongoose.Schema(field, { timestamps: true });
module.exports = mongoose.model("SysSession", sysSessionSchema);
