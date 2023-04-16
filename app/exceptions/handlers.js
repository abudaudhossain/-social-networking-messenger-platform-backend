const native = require("../helpers/native")
const DeviceInfoError = require("./DeviceInfoError")
const NotAcceptableError = require("./NotAcceptableError")
const NotFoundError = require("./NotFountError")
const UnauthorizedError = require("./UnauthorizedError")

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

    else if (v.error instanceof UnauthorizedError) {
        native.response({
            responseCode: "TRY_AGAIN",
            errorLog: v.errorLog,
            status: 401,
            data: {}
        }, req, res)
    }
    else if (v.error instanceof NotAcceptableError) {
        native.response({
            responseCode: "TRY_AGAIN",
            errorLog: v.errorLog,
            status: 406,
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