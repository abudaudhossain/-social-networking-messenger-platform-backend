const postRes = (data) => {
    // console.log(data,"data")
    let { createdBy, _id, description, image, likes, shares, comments } = data;

    return {
        userId: createdBy,
        postId: _id,
        description,
        photo: image,
        likes: likes.length,
        shares: shares.length,
        comments: comments.length,
    };
};

const postsRes = (posts) => {
    const newPost = [];
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let {
            _id,
            description,
            image,
            likes,
            shares,
            comments,
            createdAt,
            createdBy,
            status,
        } = post;
        let { name } = post?.user;

        let resObj = {
            postID: _id,
            postByName: name ? name : null,
            postByUserID: createdBy,
            postByImage: post.user.image,
            postTime: createdAt,
            postImage: image,
            postText: description,
            postLikes: likes.length,
            postComments: comments.length,
            postShares: shares.length,
        };

        newPost.push(resObj);
    }

    return newPost;
};

module.exports = {
    postRes,
    postsRes,
};
