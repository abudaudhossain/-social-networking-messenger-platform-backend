const DeviceInfoError = require("../exceptions/DeviceInfoError");
const handlers = require("../exceptions/handlers");

const firstAuthMiddleware = require("../services/firstAuthMiddleware");
const sysDevice = require("../services/sysDevice");
const firstAuthRequestValidation = require("../validation/request/firstAuthRequestValidation");

module.exports = async (req, res, next) => {
    try {
        req.nativeRequest = {};
        req.nativeRequest.requestTime = new Date().toUTCString();
        // @validation
        firstAuthRequestValidation(req);

        if (!(req.originalUrl === "/system/device")) {
            const deviceToken = req.header("device-token");
            const device = await sysDevice.getDevice(deviceToken);
            // console.log("firstAuthRequestValidation, device L: 22", device)
            
            if (device.length === 0) throw new DeviceInfoError("👺🤬🤬😡😡👹Your device Token invalid👺🤬🤬😡😡👹")

        }

        // @service add nativeRequestData req
        firstAuthMiddleware(req);

        // console.log(req.nativeRequest, "first Auth l:12")

        next();
    } catch (error) {
        console.log(error);
        handlers({
            errorLog: {
                location: req.originalUrl.slice(1).split("/").join("::"),
                query: "SYSTEM FIRST AUTH MIDDLEWARE",
                details: `Error: ${error}`
            },
            error
        }, req, res)
    }
}