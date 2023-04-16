const express = require("express");

const router = express.Router();

const welcome = require("../app/controllers/welcome");
const auth = require("../app/controllers/auth");

// middleware
const userAuth = require("../app/middleware/userAuth");
const profile = require("../app/controllers/profile");
const post = require("../app/controllers/post");
const comment = require("../app/controllers/comment");
const fileUploader = require("../app/controllers/fileUploader");
const messenger = require("../app/controllers/messenger");

router.get("/", userAuth, welcome.welcome);

router.post("/signup", auth.reg);
router.post("/login", auth.login);
router.get("/logout", userAuth, auth.logout);

router.get("/me", userAuth, profile.userProfile);
router.put("/me", userAuth, profile.updateProfile);
router.post(
    "/me/add/social-accounts",
    userAuth,
    profile.addSocialAccountInProfile
);

router.get("/me/connection/list", userAuth, profile.userConnectionList);
router.get("/me/connect/:connectProfileId", userAuth, profile.connectByUserId);
router.get(
    "/me/disconnect/:connectProfileId",
    userAuth,
    profile.disLikeByPostId
);

router.get("/user-list", userAuth, profile.profileList);
router.get("/user/details/:userId", userAuth, profile.profileByUserId);

router.post("/create/post", userAuth, post.createPost);
router.get("/me/posts", userAuth, post.getPostsList);
router.get("/me/post/:postId", userAuth, post.postDetailsById);
router.put("/me/post/:postId", userAuth, post.updatePostById);
router.delete("/me/post/:postId", userAuth, post.deletePostById);

router.put("/me/comment/:commentId", userAuth, comment.updateCommentById);
router.delete("/me/comment/:commentId", userAuth, comment.deleteCommentById);

router.get("/post/like/:postId", userAuth, post.likeByPostId);
router.get("/post/dislike/:postId", userAuth, post.disLikeByPostId);
router.post("/post/share/:postId", userAuth, post.shareByPostId);

router.post("/post/comment/:postId", userAuth, comment.createComment);

router.get("/feeds", userAuth, post.feeds);
router.get("/feeds/search/:keyword", userAuth, post.searchFeeds);

router.post("/image/upload", userAuth, fileUploader.imageUpload);
router.get("/showFile/storage/:fileName", fileUploader.showFile);

// messenger api
router.post(
    "/create/contact/:withUserProfileId",
    userAuth,
    messenger.createContact
);
router.get(
    "/create/contact/:withUserProfileId",
    userAuth,
    messenger.getContact
);

router.post("/send/message/:chatId", userAuth, messenger.sendMessage);
router.get("/get/message/:chatId", userAuth, messenger.getMessagesByChatId);

module.exports = router;
