const NotAcceptableError = require("../exceptions/NotAcceptableError");
const ValidationError = require("../exceptions/ValidationError");
const handlers = require("../exceptions/handlers");
const native = require("../helpers/native");
const {
    createNewContact,
    getChatContact,
    createNewMessage,
    getMessages,
} = require("../services/messenger");
const { getUserProfile } = require("../services/profile");
const {
    updateInfoValidation,
} = require("../validation/validationHelpers/validationHelper");

const messagesRes = require("../helpers/messageRes");

const createContact = async (req, res) => {
    const userId = req.nativeRequest.setUserId;
    const profileId = req.nativeRequest.setProfile;
    const { withUserProfileId } = req.params;
    try {
        const users = await getUserProfile({ _id: withUserProfileId });

        if (!users.length > 0)
            throw new NotAcceptableError("Contact User Profile Wrong");

        const existContactsList = await getChatContact({
            members: [profileId, withUserProfileId],
        });
        console.log(existContactsList);
        if (existContactsList.length > 0)
            throw new NotAcceptableError("Already Has This Contact");

        const newContact = await createNewContact({
            members: [profileId, withUserProfileId],
        });

        native.response(
            {
                errorLog: {},
                data: {
                    message: "Insert New Contact SuccessFul",
                    chatContact: newContact,
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
                    query: `CREATE NEW CONTACT TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const getContact = async (req, res) => {
    const userId = req.nativeRequest.setUserId;
    const profileId = req.nativeRequest.setProfile;
    const { withUserProfileId } = req.params;
    let query = { $all: [profileId, withUserProfileId] };
    try {
        console.log({ members: [profileId, withUserProfileId] });
        if (profileId.equals(withUserProfileId)) {
            query = [profileId, withUserProfileId];
        }
        const existContactsList = await getChatContact({
            members: query,
        });

        if (!existContactsList.length > 0)
            throw new ValidationError("Chat Contact Not Found");
        const chatContact = existContactsList[0];
        let withUserProfile = {};
        for (let i = 0; i < chatContact.members.length; i++) {
            if (chatContact.members[i]._id.equals(withUserProfileId)) {
                withUserProfile = chatContact.members[i];
                console.log(i);
                break;
            }
        }
        console.log(
            existContactsList,
            "esldkafj==============",
            withUserProfile
        );

        native.response(
            {
                errorLog: {},
                data: {
                    chatId: existContactsList[0]._id,
                    withUserName: withUserProfile.name,
                    withUserProfileId: withUserProfile._id,
                    withUserImage: withUserProfile.image,
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
                    query: `GET CHAT CONTACT TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const sendMessage = async (req, res) => {
    const userId = req.nativeRequest.setUserId;
    const profileId = req.nativeRequest.setProfile;
    const { chatId } = req.params;
    try {
        const existContactsList = await getChatContact({
            _id: chatId,
        });
        if (!existContactsList.length > 0)
            throw new ValidationError("Chat Contact Not Found");

        const updateKeys = Object.keys(req.body);

        if (!updateKeys.includes("text")) {
            if (!updateKeys.includes("image"))
                throw new ValidationError("Text or image Required");
        }
        updateInfoValidation(updateKeys);
        let chatContact = existContactsList[0];
        let receiverUserProfile;
        for (let i = 0; i < chatContact.members.length; i++) {
            if (!chatContact.members[i]._id.equals(profileId)) {
                receiverUserProfile = chatContact.members[i];
                console.log(i);
                break;
            }
        }
        let message = await createNewMessage({
            ...req.body,
            sender: profileId,
            chatId: chatId,
        });

        const resMessages = messagesRes.messagesRes([message]);
        let msg = {
            ...resMessages[0],
            receiverId: receiverUserProfile._id,
        };
        req.io.emit(
            `unreadMessage_sender${msg.senderId}_res${msg.receiverId}`,
            msg
        );
        req.io.emit(`${chatId}`, msg);
        native.response(
            {
                errorLog: {},
                data: {
                    message: "Message Send SuccessFul",
                    newMessage: msg,
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
                    query: `SEND NEW MESSAGE TO WEBSITE BLOCK`,
                    details: `Error : ${error}`,
                },
                error,
            },
            req,
            res
        );
    }
};

const getMessagesByChatId = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await getMessages({ chatId: chatId });

        const resMessages = messagesRes.messagesRes(messages);
        native.response(
            {
                errorLog: {},
                data: {
                    messages: resMessages,
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
                    query: `GET MESSAGES TO WEBSITE BLOCK`,
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
    createContact,
    getContact,
    sendMessage,
    getMessagesByChatId,
};
