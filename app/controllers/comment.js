const ValidationError = require("../exceptions/ValidationError");
const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");
const { postRes } = require("../helpers/postRes");
const { updatePost } = require("../services/Post");
const {
    createNewComment,
    updateComment,
    deleteComment,
} = require("../services/comment");
const {
    updateInfoValidation,
} = require("../validation/validationHelpers/validationHelper");

const createComment = async (req, res) => {
    const userId = req.nativeRequest.setUserId;
    const profileId = req.nativeRequest.setProfile;
    const { postId } = req.params;
    try {
        const keys = Object.keys(req.body);

        if (!keys.includes("description")) {
            if (!keys.includes("image"))
                throw new ValidationError("Description or image Required");
        }
        updateInfoValidation(keys);
        let comment = await createNewComment({
            ...req.body,
            createdBy: userId,
            user: profileId,
            post: postId,
        });

        const post = await updatePost(
            { _id: postId },
            { $addToSet: { comments: comment._id } }
        );

        let resData = postRes(post);

        native.response(
            {
                errorLog: {},
                data: {
                    message: "Comment Insert SuccessFul",
                    post: post,
                    comment: comment,
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
                    query: `CREATE NEW POST TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const updateCommentById = async (req, res) => {
    let resData = {};
    try {
        const userId = req.nativeRequest.setUserId;
        const { commentId } = req.params;

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

        const comment = await updateComment(
            { createdBy: userId, _id: commentId },
            req.body
        );
        if (!comment) throw new ValidationError("Can not Found Comment");
        native.response(
            {
                errorLog: {},
                data: {
                    message: "Update Successful",
                    updateInfo: comment,
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
                    query: `WELCOME UPDATE POST BY ID TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};
const deleteCommentById = async (req, res) => {
    try {
        const userId = req.nativeRequest.setUserId;
        const { commentId } = req.params;
        let post = {};

        const comment = await deleteComment({
            createdBy: userId,
            _id: commentId,
        });
        console.log(comment);
        if (comment) {
            post = await updatePost(
                { _id: comment.post },
                { $pull: { comments: comment._id } }
            );
        }
        // let resData = postRes(post)
        native.response(
            {
                errorLog: {},
                data: {
                    message: "Delete Successful",
                    count: comment ? 1 : 0,
                    post,
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
                    query: `WELCOME UPDATE POST BY ID TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

module.exports = {
    createComment,
    updateCommentById,
    deleteCommentById,
};
