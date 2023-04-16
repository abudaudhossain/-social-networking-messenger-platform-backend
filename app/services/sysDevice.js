const utility = require("../helpers/utility");
// model
const sysDevice = require('../models/system/Device');


module.exports = {
    newDeviceRegister: async (req) => {
        let { activityToken, deviceSessionToken, appToken, userToken, userAgent, ipAddress, source, deviceId, deviceInfo } = req.nativeRequest;

        let saveNewDeviceData = {
            token: utility.getToken("DEV_ID"),
            deviceSessionToken,
            appToken,
            userAgent,
            ipAddress,
            source,
            deviceId,
            deviceInfo,

            //common felid
            status: "active",
            existence: 1,
            createdBy: userToken,
            activityToken
        }

        const newSysDevice = new sysDevice(saveNewDeviceData);
        await newSysDevice.save();


        return {
            deviceToken: newSysDevice.token,
            status: newSysDevice.status,
            appToken: newSysDevice.appToken
        };


    },
    getDevice: async (deviceToken) => {
        const device = await sysDevice.find({ token: deviceToken })
        
        return device
    }
}

