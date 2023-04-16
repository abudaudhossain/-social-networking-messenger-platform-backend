const jwt = require("jsonwebtoken");

module.exports = {
    getToken: (content) => {
        const getRandomIndex = () => {
            const index = Math.floor(Math.random() * 10);
            if (index < 52) {
                return index;
            } else {
                return getRandomIndex();
            }
        };

        const numberToken = () => {
            const characters = "0123456789";
            let stToken = "";
            for (let i = 0; i < 15; i++) {
                stToken += characters[getRandomIndex()];
            }
            return stToken;
        };

        return content + numberToken();
    },

    getAccessToken: (data) => {
        console.log(process.env.JWT_KEY);
        return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "30 days" });
    },

    isTagExist: (tagList = [], message = "") => {
        const re = /#/;
        const messageWords = message.split(re).join(" ").split(" ");

        for (let i = 0; i < tagList.length; i++) {
            let tag = tagList[i].split(re).slice(-1)[0];
            // console.log(tag);
            if (messageWords.indexOf(tag) !== -1) {
                // console.log(tagList[i], tag);
                return true;
            }
        }

        return false;
    },
};
