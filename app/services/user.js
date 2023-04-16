const User = require("../models/core/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    createNewUser: async (data) => {
        try {
            const saveData = {
                ...data,
            };

            if (data.password) {
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(data.password, salt);
                saveData.password = hash;
            }

            const newUser = new User(saveData);
            const result = await newUser.save();

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getUser: async (query, filter = { password: 0, createBy: 0 }) => {
        return await User.find(query, filter);
    },

    getBasicInfo: async (query, filter = { name: 1, email: 1 }) => {
        return await User.find(query, filter);
    },
    getLoginUser: async (query) => {
        return await User.find(query, {
            socialMediaAccounts: 0,
            image: 0,
            bio: 0,
        });
    },
    updateUser: async (filter, update) => {
        let res = await User.findOneAndUpdate(filter, update, { new: true });
        if (res) {
            delete res._doc.password;
            delete res._doc.existence;
            delete res._doc.updatedAt;
            delete res._doc.tokens;
        }
        return res;
    },
    saveToken: async (filter, token) => {},
};
