module.exports = {
    getToken: (content) => {

        const getRandomIndex = () => {
            const index = Math.floor(Math.random() * 10);
            if (index < 52) {
                return index;
            } else {
                return getRandomIndex();
            }
        }

        const numberToken = () => {
            const characters = "0123456789";
            let stToken = "";
            for (let i = 0; i < 15; i++) {
                stToken += characters[getRandomIndex()];
            }
            return stToken;
        }

        return content + numberToken()
    },
}