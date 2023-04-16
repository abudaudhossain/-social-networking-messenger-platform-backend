const Post = require("../models/core/Post");

module.exports = {
    createNewPost: async (data) => {
        try {
            const saveData = {
                ...data,
            };

            const newPost = new Post(saveData);
            const result = await newPost.save();

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getUserAllPost: async (query, filter = { existence: 0, status: 0 }) => {
        return await Post.find(query, filter)
            .populate("user", ["name", "image", "user"])
            .populate("sharePost");
    },
    getUserPostById: async (query) => {
        return await Post.find(query, { existence: 0, status: 0 })
            .populate("user", ["name", "image", "user"])
            .populate("likes", ["name", "image", "user"])
            .populate("shares", ["name", "image", "user"])
            .populate("comments", ["name", "image", "user"])
            .populate("sharePost");
    },
    updatePost: async (filter, update) => {
        let res = await Post.findOneAndUpdate(filter, update, { new: true });
        return res;
    },

    deletePost: async (query) => {
        return await Post.findByIdAndDelete(query);
    },
};
