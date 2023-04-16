const mongoose = require("mongoose");

const field = {
    deviceSessionToken: {
        type: String
    },
    appToken: {
        type: String
    },
    userAgent: {
        type: Object
    },
    ipAddress: {
        type: String
    },
    source: {
        type: String
    },
    deviceId: {
        type: String
    },
    deviceInfo: {
        type: String
    },

    // common field 
    status: { // active
        type: String
    },
    existence: { // 1
        type: Number
    },
    createdBy: { // @relation
        type: String
    },
    activityToken: { // @relation
        type: String
    }
    
};

const sysDeviceSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model('SysDevice', sysDeviceSchema)