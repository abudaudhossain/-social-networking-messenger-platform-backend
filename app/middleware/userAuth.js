const handlers = require("../exceptions/handlers");
const JWT = require("jsonwebtoken");
const UnauthorizedError = require("../exceptions/UnauthorizedError");
const { getUser, getLoginUser } = require("../services/user");

module.exports = async (req, res, next) => {
    try {
        req.nativeRequest = {};
        req.nativeRequest.requestTime = new Date().toUTCString();
        // @validation
        // json web token verification
        const JWToken = req.headers.authorization.split(" ")[1];
        let decoded = JWT.verify(
            JWToken,
            process.env.JWT_KEY,
            (err, decoded) => {
                if (err)
                    throw new UnauthorizedError(
                        "JWT Is wrong.Please Login Now."
                    );
                return decoded;
            }
        );

        const users = await getLoginUser({ _id: decoded._id });
        // console.log(users);
        if (!users.length > 0)
            throw new UnauthorizedError(
                "Can't found User. Please create new account"
            );

        let user = users[0];
        if (!user.tokens.includes(JWToken))
            throw new UnauthorizedError("Expired auth token");

        req.nativeRequest.setUser = {
            username: user.username,
            email: user.email,
            userId: user._id,
        };
        req.nativeRequest.setUserId = user._id;
        req.nativeRequest.setProfile = user.user;
        req.nativeRequest.setJWToken = JWToken;

        next();
    } catch (error) {
        console.log(error);
        handlers(
            {
                errorLog: {
                    location: req.originalUrl.slice(1).split("/").join("::"),
                    query: "LOGIN AUTH MIDDLEWARE",
                    details: `Error: ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};
