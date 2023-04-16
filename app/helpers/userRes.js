const profileRes = (data) => {
    // console.log(data,"data")
    let {
        userId,
        _id,
        name,
        email,
        image,
        socialMediaAccounts,
        bio,
        username,
    } = data;

    return {
        userId: userId,
        userProfileId: _id,
        userName: username,
        name,
        userEmail: email,
        userBio: bio ? bio : null,
        profilePhoto: image,
        socialAccounts: socialMediaAccounts,
        userByPosts: [],
    };
};

const usersListRes = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
        let { user, _id, name, email, image, bio } = data[i];

        list.push({
            userId: user,
            userProfileId: _id,

            name,
            userEmail: email,
            userBio: bio ? bio : null,
            profilePhoto: image,
        });
    }

    return list;
};

module.exports = {
    profileRes,
    usersListRes,
};
