const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");

module.exports = {
    welcome: async (req, res) => {

        try {
            native.response({
                'responseCode': 'LIST_LOADED',
                'errorLog': {},
                'data': {
                    "type": "Social Networking System",
                },
                'status': 200
            }, req, res);
        } catch (error) {
            console.log(error)
            handlers({
                'errorLog': {
                    'location': req.originalUrl.split("/").join("::"),
                    'query': `WELCOME TO WEBSITE BLOCK`,
                    'details': `Error : ${error}`
                },
                error
            }, req, res)
        }
    }
}