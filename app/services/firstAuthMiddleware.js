const utility = require("../helpers/utility");

const formats = {
    userToken: 'ABU_DAUD_HOSSAIN________sysGuestUser_ABU_DAUD_HOSSAIN_ts',
    sessionToken: 'ABU_DAUD_HOSSAIN________sysGuestSession_ABU_DAUD_HOSSAIN_ts',
    deviceToken: 'ABU_DAUD_HOSSAIN________sysGuestUser_ABU_DAUD_HOSSAIN_ts',
    activityToken: 'ABU_DAUD_HOSSAIN________sysGuestActivity_ABU_DAUD_HOSSAIN_ts'
}


module.exports = (req) => {

    const nativeRequest = {};

    nativeRequest.deviceSessionToken = req.header("device-session-token")
    nativeRequest.appToken = req.header("app-token")
    nativeRequest.appKey = req.header("app-key")
    nativeRequest.userAgent = req.header("user-agent");
    nativeRequest.ipAddress = req.headers['x-real-ip'] || req.connection.remoteAddress;
    nativeRequest.source = req.header("source")
    nativeRequest.deviceId = req.header("device-id")
    nativeRequest.deviceInfo = req.header("device-info")
    nativeRequest.appPassword = req.header("app-password")
    nativeRequest.contentType = req.header("content-type")
    nativeRequest.permission = req.header("permission")
    nativeRequest.language = req.header("language")
    nativeRequest.requestTime = req.nativeRequest.requestTime;
    nativeRequest.activityToken = utility.getToken("ACTLOG");

    if (req.header("device-token")) {
        nativeRequest.deviceToken = req.header("device-token");
    } else {
        nativeRequest.deviceToken = formats.deviceToken;
    }

    if (req.header("user-token")) {
        nativeRequest.userToken = req.header("user-token");
    } else {
        nativeRequest.userToken = formats.userToken;
    }

    if (req.header("session-token")) {
        nativeRequest.sessionToken = req.header("session-token");
    } else {
        nativeRequest.sessionToken = formats.sessionToken;
    }

    //save to req
    req.nativeRequest = nativeRequest;

    // console.log(nativeRequest, "firstAuthMidd L:17")

}