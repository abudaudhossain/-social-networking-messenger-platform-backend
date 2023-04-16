const NotFoundError = require("../../exceptions/NotFountError");
const sysDevice = require("../../services/sysDevice");
const validationHelper = require("../validationHelpers/validationHelper")

module.exports = function (req) {


    const requireReqData = ["device-session-token", "app-token", "app-key", "user-agent", "source", "device-id", "device-info", "app-password", "content-type", "permission", "language"]

    if (!(req.originalUrl === "/system/device")) {
        requireReqData.push("device-token");
    }


    validationHelper.ObjExists(requireReqData, req.headers);
    validationHelper.isEmpty(Object.values(req.headers))

}