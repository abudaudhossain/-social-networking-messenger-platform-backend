const ValidationError = require("../exceptions/ValidationError");
const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");
const { postRes, postsRes } = require("../helpers/postRes");
const { isTagExist } = require("../helpers/utility");
const {
    createNewPost,
    getUserAllPost,
    updatePost,
    deletePost,
    getUserPostById,
} = require("../services/Post");
const { getUserConnectionList } = require("../services/profile");
const {
    updateInfoValidation,
} = require("../validation/validationHelpers/validationHelper");

const createPost = async (req, res) => {
    const userId = req.nativeRequest.setUserId;
    const profileId = req.nativeRequest.setProfile;
    try {
        const updateKeys = Object.keys(req.body);

        if (!updateKeys.includes("description")) {
            if (!updateKeys.includes("image"))
                throw new ValidationError("Description or image Required");
        }
        updateInfoValidation(updateKeys);
        let post = await createNewPost({
            ...req.body,
            createdBy: userId,
            user: profileId,
        });

        let resData = postRes(post);

        native.response(
            {
                errorLog: {},
                data: {
                    message: "Post Insert SuccessFul",
                    post: post,
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

const getPostsList = async (req, res) => {
    const userId = req.nativeRequest.setUserId;
    try {
        let posts = await getUserAllPost({ createdBy: userId });
        // console.log("post===============", posts);
        // let resData = postsRes(post);

        native.response(
            {
                errorLog: {},
                data: posts,
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
                    query: `GET POST TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const postDetailsById = async (req, res) => {
    try {
        const userId = req.nativeRequest.setUserId;
        const { postId } = req.params;

        console.log({ createBy: userId, _id: postId });
        const posts = await getUserPostById({ _id: postId, createdBy: userId });

        native.response(
            {
                errorLog: {},
                data: posts[0] ? posts[0] : {},
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

const updatePostById = async (req, res) => {
    let resData = {};
    try {
        const userId = req.nativeRequest.setUserId;
        const { postId } = req.params;

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

        const post = await updatePost(
            { createdBy: userId, _id: postId },
            req.body
        );
        if (!post) throw new ValidationError("Can not Found Post");
        native.response(
            {
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
const deletePostById = async (req, res) => {
    try {
        const userId = req.nativeRequest.setUserId;
        const { postId } = req.params;

        const post = await deletePost(
            { createdBy: userId, _id: postId },
            req.body
        );
        // let resData = postRes(post)
        native.response(
            {
                errorLog: {},
                data: {
                    message: "Delete Successful",
                    count: post ? 1 : 0,
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

const likeByPostId = async (req, res) => {
    try {
        const profileId = req.nativeRequest.setProfile;
        const { postId } = req.params;

        const post = await updatePost(
            { _id: postId },
            { $addToSet: { likes: profileId } }
        );
        // let resData = postRes(post)
        native.response(
            {
                errorLog: {},
                data: post,
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
};

const disLikeByPostId = async (req, res) => {
    try {
        const profileId = req.nativeRequest.setProfile;
        const { postId } = req.params;

        const post = await updatePost(
            { _id: postId },
            { $pull: { likes: profileId } }
        );
        // let resData = postRes(post)
        native.response(
            {
                errorLog: {},
                data: post,
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
};

const shareByPostId = async (req, res) => {
    try {
        const userId = req.nativeRequest.setUserId;
        const profileId = req.nativeRequest.setProfile;
        const { postId } = req.params;

        const updateKeys = Object.keys(req.body);
        updateInfoValidation(updateKeys);

        let sharedPosts = await getUserAllPost({ _id: postId });
        if (!(sharedPosts.length > 0))
            throw new ValidationError("This Post was not Found");

        let post = await createNewPost({
            ...req.body,
            createdBy: userId,
            user: profileId,
            sharePost: postId,
        });

        // let resData = postRes(post);

        let sharedPost = await updatePost(
            { _id: postId },
            { $push: { shares: profileId } }
        );
        // let resData = postRes(post)
        native.response(
            {
                errorLog: {},
                data: {
                    newPost: post,
                    sharedPost,
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
                    query: `WELCOME SHARE POST BY ID TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const searchFeeds = async (req, res) => {
    let postsList = [];
    let { keyword } = req.params;
    try {
        let posts = await getUserAllPost({});

        for (let p = 0; p < posts.length; p++) {
            let post = posts[p];
            if (isTagExist([keyword], post.description)) {
                postsList.push(post);
            } else {
                if (isTagExist([keyword], post?.sharePost?.description)) {
                    postsList.push(post);
                }
            }
        }
        postsList = postsList.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        native.response(
            {
                responseCode: "LIST_LOADED",
                errorLog: {},
                data: {
                    count: postsList.length,
                    feeds: postsList,
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
                    query: `USER PROFILE TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const feeds = async (req, res) => {
    let postsList = [];
    try {
        const userId = req.nativeRequest.setUserId;

        const userProfile = await getUserConnectionList(
            { user: userId },
            { name: 1, email: 1, user: 1, image: 1 }
        );
        let { connections } = userProfile[0];
        if (!connections) connections = [];

        let posts = await getUserAllPost({ createdBy: userId });
        postsList = [...postsList, ...posts];

        for (let c = 0; c < connections.length; c++) {
            let { user } = connections[c];
            let posts = await getUserAllPost({ createdBy: user });
            postsList = [...postsList, ...posts];
        }

        postsList = postsList.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        native.response(
            {
                responseCode: "LIST_LOADED",
                errorLog: {},
                data: {
                    count: postsList.length,
                    feeds: postsList,
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
                    query: `USER PROFILE TO WEBSITE BLOCK`,
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
    createPost,
    getPostsList,
    updatePostById,
    deletePostById,
    postDetailsById,
    likeByPostId,
    disLikeByPostId,
    shareByPostId,
    feeds,
    searchFeeds,
};
