const Comment = require("../models/core/Comment");

module.exports = {
    createNewComment: async (data) => {
        try {
            const saveData = {
                ...data,
            };

            const newComment = new Comment(saveData);
            const result = await newComment.save();

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    updateComment: async (filter, update) => {
        let res = await Comment.findOneAndUpdate(filter, update, { new: true });
        return res;
    },

    deleteComment: async (query) => {
        return await Comment.findByIdAndDelete(query);
    },
};
