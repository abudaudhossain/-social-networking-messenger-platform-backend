const native = require("../helpers/native")
const DeviceInfoError = require("./DeviceInfoError")
const NotFoundError = require("./NotFountError")

module.exports = (v, req, res) => {
    if (v.error instanceof NotFoundError) {
        native.response({
            responseCode: "TRY_AGAIN",
            errorLog: v.errorLog,
            status: 404,
            data: {}
        }, req, res)
    }
    else if (v.error instanceof DeviceInfoError) {
        native.response({
            responseCode: "DEVICE_TOKEN_MISMATCHED",
            errorLog: v.errorLog,
            status: 404,
            data: {}
        }, req, res)
    }
    else {
        native.response({
            responseCode: "TRY_AGAIN",
            errorLog: v.errorLog,
            status: 400,
            data: {}
        }, req, res)
    }
}