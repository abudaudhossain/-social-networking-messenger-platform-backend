const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");
const { profileRes, usersListRes } = require("../helpers/userRes");
const {
    updateInfoValidation,
} = require("../validation/validationHelpers/validationHelper");
const { getUser } = require("../services/user");
const ValidationError = require("../exceptions/ValidationError");
const NotAcceptableError = require("../exceptions/NotAcceptableError");
const {
    getUserProfile,
    updateUserProfile,
    getBasicProfileInfo,
    getUserConnectionList,
} = require("../services/profile");

module.exports = {
    userProfile: async (req, res) => {
        console.log(req.nativeRequest.setUser);

        try {
            const userId = req.nativeRequest.setUserId;

            const usersProfile = await getUserProfile({ user: userId });

            let resData = profileRes({
                ...usersProfile[0]._doc,
                ...req.nativeRequest.setUser,
            });

            native.response(
                {
                    responseCode: "LIST_LOADED",
                    errorLog: {},
                    data: resData,
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
                        query: `USER PROFILE TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },
    updateProfile: async (req, res) => {
        try {
            const userId = req.nativeRequest.setUserId;

            // can't update password, _id
            const updateKeys = Object.keys(req.body);

            updateInfoValidation(updateKeys);

            if (updateKeys.includes("status")) {
                const status = req.body.status;
                const statusValue = ["active", "inactive"];
                if (!statusValue.includes(status)) {
                    throw new ValidationError(
                        "This status can't support our system"
                    );
                }
            }
            if (updateKeys.includes("email")) {
                const user = await getUser({
                    $or: [{ email: req.body.email }],
                });
                if (user.length > 0)
                    throw new NotAcceptableError("This Email Already Exit");
            }

            const user = await updateUserProfile({ user: userId }, req.body);
            let resData = profileRes(user);
            native.response(
                {
                    responseCode: "UPDATE_SUCCESSFUL",
                    errorLog: {},
                    data: {
                        message: "Update Successful",
                        updateInfo: resData,
                    },
                    meta: {},
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
                        query: `WELCOME UPDATE PROFILE BY ID TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },
    addSocialAccountInProfile: async (req, res) => {
        try {
            const { socialAccount } = req.body;
            if (!socialAccount)
                throw new ValidationError("Social Account Required");

            const userId = req.nativeRequest.setUserId;

            const users = await getUserProfile({
                user: userId,
            });
            let socialMediaAccounts = users[0].socialMediaAccounts;
            socialMediaAccounts.push(socialAccount);

            const result = await updateUserProfile(
                { user: userId },
                { socialMediaAccounts }
            );
            let resData = profileRes(result);

            native.response(
                {
                    responseCode: "UPDATE_SUCCESSFUL",
                    errorLog: {},
                    data: {
                        message: "Update Successful",
                        updateInfo: resData,
                    },
                    meta: {},
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
                        query: `WELCOME UPDATE PROFILE BY ID TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },
    profileList: async (req, res) => {
        try {
            const usersProfileList = await getBasicProfileInfo({});

            let resData = usersListRes(usersProfileList);

            native.response(
                {
                    responseCode: "LIST_LOADED",
                    errorLog: {},
                    data: resData,
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
                        query: `USER PROFILE LIST TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },
    profileByUserId: async (req, res) => {
        try {
            const { userId } = req.params;

            const usersProfile = await getUserProfile({ user: userId });

            let resData = profileRes(usersProfile[0]);

            native.response(
                {
                    responseCode: "LIST_LOADED",
                    errorLog: {},
                    data: resData,
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
                        query: `USER PROFILE LIST TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },

    connectByUserId: async (req, res) => {
        try {
            const profileId = req.nativeRequest.setProfile;
            const { connectProfileId } = req.params;

            const user = await updateUserProfile(
                { _id: profileId },
                { $addToSet: { connections: connectProfileId } }
            );

            // let resData = postRes(post)
            native.response(
                {
                    errorLog: {},
                    data: user,
                    meta: {},
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
                        query: `WELCOME LIKE POST BY ID TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },

    disLikeByPostId: async (req, res) => {
        try {
            const profileId = req.nativeRequest.setProfile;
            const { connectProfileId } = req.params;

            const user = await updateUserProfile(
                { _id: profileId },
                { $pull: { connections: connectProfileId } }
            );

            // let resData = postRes(post)
            native.response(
                {
                    errorLog: {},
                    data: user,
                    meta: {},
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
                        query: `WELCOME LIKE POST BY ID TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },

    userConnectionList: async (req, res) => {
        // console.log(req.nativeRequest.setUser)

        try {
            const userId = req.nativeRequest.setUserId;

            const userProfile = await getUserConnectionList(
                { user: userId },
                { name: 1, email: 1, user: 1, image: 1 }
            );
            let { connections } = userProfile[0];
            if (!connections) connections = [];

            native.response(
                {
                    responseCode: "LIST_LOADED",
                    errorLog: {},
                    data: connections,
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
                        query: `USER PROFILE TO WEBSITE BLOCK`,
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
