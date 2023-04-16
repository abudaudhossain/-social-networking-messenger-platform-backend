const NotAcceptableError = require("../exceptions/NotAcceptableError");
const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");
const { getAccessToken, getToken } = require("../helpers/utility");
const { createNewProfile } = require("../services/profile");
const { getUser, createNewUser, getLoginUser, updateUser } = require("../services/user");
const { ObjExists } = require("../validation/validationHelpers/validationHelper");
const bcrypt = require("bcrypt");


module.exports = {
    reg: async (req, res) => {
        try {

            const { name, email, password } = req.body;

            //  @validation part
            ObjExists(["name", "email", "password"], req.body);
            // exit user validation
            const user = await getUser({
                $or: [{ email: email }],
            });
            if (user.length > 0)
                throw new NotAcceptableError("This User Already Exit");

            // @Business logic part

            // create employee
            let username = getToken(name.split(" ")[0])
            const saveUser = {
                username,
                email,
                password
            };
            console.log("saveUser", saveUser);
            const newUser = await createNewUser(saveUser);

            if (!newUser._id) throw new Error("Server Problem")

            const saveProfileInfo = {
                name,
                user: newUser._id,
                email
            }
            console.log(saveProfileInfo);
            const newProfile = await createNewProfile(saveProfileInfo)
            let result = updateUser({ _id: newUser._id }, { user: newProfile._id })
            console.log(result);

            native.response({
                'responseCode': 'INSERTION_SUCCESSFUL',
                'errorLog': {},
                'data': newProfile,
                'status': 200
            }, req, res);

        } catch (error) {
            console.log(error)
            handlers({
                'errorLog': {
                    'location': req.originalUrl.split("/").join("::"),
                    'query': `NEW USER SIGNUP TO WEBSITE BLOCK`,
                    'query': `NEW USER SIGNUP TO WEBSITE BLOCK`,
                    'details': `Error : ${error}`
                },
                error
            }, req, res)
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // @validation part
            const users = await getLoginUser({
                $or: [{ email: email }],
            });
            if (!users.length > 0)
                throw new UnauthorizedError("User Can't Found. Please Register First");
            // console.log(users);
            const { _id } = users[0];
            if (!bcrypt.compareSync(password, users[0].password)) {
                throw new UnauthorizedError("Password Wrong");
            }
            const accessToken = getAccessToken(
                {
                    _id,
                    logAt: new Date(),
                },
                process.env.JWT_KEY
            );


            let tokens = users[0].tokens;
            tokens.push(accessToken)

            // let result = await updateUser({ _id }, {
            //     $pull: {
            //         tokens: '2',
            //     }
            // })
            let result = await updateUser({ _id }, { logAt: new Date(), tokens })


            // console.log(result, tokens);


            native.response({
                'responseCode': 'LIST_LOADED',
                'errorLog': {},
                'data': { accessToken: accessToken },
                'status': 200
            }, req, res);
        } catch (error) {
            console.log(error);
            handlers(
                {
                    errorLog: {
                        location: req.originalUrl.split("/").join("::"),
                        query: `LOGIN TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },

    logout: async (req, res) => {
        try {
            const JWToken = req.nativeRequest.setJWToken
            const user = req.nativeRequest.setUser;

            let result = await updateUser({ _id: user._id }, {
                $pull: {
                    tokens: JWToken,
                }
            })

            native.response({
                'responseCode': 'LIST_LOADED',
                'errorLog': {},
                'data': {
                    message: "Successfully Logout"
                },
                'status': 200
            }, req, res);
        } catch (error) {
            console.log(error);
            handlers(
                {
                    errorLog: {
                        location: req.originalUrl.split("/").join("::"),
                        query: `LOGOUT TO WEBSITE BLOCK`,
                        details: `Error : ${error}`,
                    },
                    error,
                },
                req,
                res
            );
        }
    },
}