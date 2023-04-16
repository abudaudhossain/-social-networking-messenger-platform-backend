const utils = require("./utils"); // native
const { messages } = require("../datasets/messages"); // native
const newActivity = require("../services/newActivity");

const response = async (v, req, res) => {
    console.log("V", v);

    // save activity in database

    try {
        responseHelper(
            {
                errorLog: v.errorLog,
                data: v.data,
                meta: v.meta,
                resState: "😎",
            },
            v?.status,
            res
        );
    } catch (error) {
        // @todo
        responseHelper(
            {
                dataState: "💣",
                errorLog: v.errorLog,
                data: v.data,
                meta: v.meta,
                resState: "😲",
            },
            v?.status,
            res
        );
    }
};

const responseHelper = (v, status, res) => {
    res.status(status).json({
        responseTimeUTC: new Date().toUTCString(),
        responseTimeLocal: new Date().toLocaleString(),
        dataState: v.dataState,
        errorLog: v.errorLog,
        data: v.data,
        meta: v.meta,
        resState: v.resState,
    });
};

exports.response = response;
