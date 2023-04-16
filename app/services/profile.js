const Profile = require("../models/core/Profile");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    createNewProfile: async (data) => {
        try {
            const saveData = {
                ...data,
            };

            const newUserProfile = new Profile(saveData);
            const result = await newUserProfile.save();

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getUserProfile: async (query, filter = {}) => {
        return await Profile.find(query, filter);
    },

    getBasicProfileInfo: async (
        query,
        filter = { name: 1, email: 1, user: 1, image: 1 }
    ) => {
        return await Profile.find(query, filter);
    },

    updateUserProfile: async (filter, update) => {
        let res = await Profile.findOneAndUpdate(filter, update, { new: true });
        // if (res) {
        //     delete res._doc.password;
        //     delete res._doc.existence;
        //     delete res._doc.updatedAt;
        //     delete res._doc.tokens;
        // }
        return res;
    },

    getUserConnectionList: async (query, filter = {}) => {
        return await Profile.find(query, filter).populate("connections");
    },
};
