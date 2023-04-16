const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");
const fs = require("fs");

module.exports = {
    showFile: (req, res) => {
        try {
            // var appRoot = ;
            console.log("rort dir", req.rootDir);
            console.log(req.rootDir + "/storage/" + req.params.fileName);
            res.sendFile(req.rootDir + "/storage/" + req.params.fileName);
        } catch (error) {
            console.log(error);
            handlers(
                {
                    errorLog: {
                        location: req.originalUrl.split("/").join("::"),
                        query: `IMAGE SHOW TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },

    imageUpload: async (req, res) => {
        let user = req.nativeRequest.setUser;
        try {
            const { image } = req.body;

            // Create Variable with Base64 Image String
            console.log(user);
            var base64Data = image.replace("data:image/png;base64,", "");
            const fileName = `image_` + user.username + Date.now();
            // Store Image into Server
            fs.writeFile(
                `storage/${fileName}.png`,
                base64Data,
                "base64",
                function (err) {
                    console.log(err);
                    if (err) {
                        handlers(
                            {
                                errorLog: {
                                    location: req.originalUrl
                                        .split("/")
                                        .join("::"),
                                    query: `IMAGE UPLOAD TO WEBSITE BLOCK`,
                                    details: `Error : ${err}`,
                                },
                                err,
                            },
                            req,
                            res
                        );
                    }
                }
            );

            console.log("Image Saved Successfully.");

            const result = `http://localhost:3000/api/showFile/storage/${fileName}.png`;

            native.response(
                {
                    errorLog: {},
                    data: {
                        image: result,
                    },
                    status: 200,
                },
                req,
                res
            );
        } catch (error) {
            console.log(error);
            handlers(
                {
                    errorLog: {
                        location: req.originalUrl.split("/").join("::"),
                        query: `IMAGE UPLOAD TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },
};
