const SysActivity = require("../models/system/Activity")

module.exports = async (req, message, v) => {
    try {
        let { activityToken, deviceToken, deviceSessionToken, appToken, userToken, sessionToken, userAgent, ipAddress, source, requestTime } = req.nativeRequest;


        const requestMethod = req.method;

        let responseSizeInBytes = ''; // @todo
        let responseTime = new Date().toUTCString();
        let saveActivityData = {
            token: activityToken,
            deviceToken,
            deviceSessionToken,
            appToken,
            userToken,
            sessionToken,
            userAgent,
            ipAddress,
            source,
            requestMethod,
            endpoint: req.originalUrl.slice(1).split("/").join("::"),
            originalURL: req.originalUrl,
            responseType: message.type,
            responseMessage: message,
            response: v,
            request: "TO DO",
            responseSizeInBytes: responseSizeInBytes,
            requestTime,
            responseTime,
            errorLog: v.errorLog,

            createdBy: userToken
        }



        let newSysActivity = new SysActivity(saveActivityData);
        await newSysActivity.save();

        // console.log("newActivity l36: ", newSysActivity)
        console.log('   ');
        console.log('.....');
        console.log('.....');
        console.log('Activity ::::');
        console.log('Full Diff ::::');
        console.log('.....');
        console.log('.....');
        console.log('  status ', v);

    } catch (error) {
        console.log(error);
    }
}