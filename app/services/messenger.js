const Chat = require("../models/core/Chat");
const Message = require("../models/core/Message");

module.exports = {
    createNewContact: async (data) => {
        try {
            const saveData = {
                ...data,
            };

            const newChat = new Chat(saveData);
            const result = await newChat.save();

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getChatContact: async (query, filter = { status: 0 }) => {
        return await Chat.find(query, filter).populate("members", [
            "name",
            "image",
        ]);
    },

    updateContactChat: async (filter, update) => {
        let res = await Chat.findOneAndUpdate(filter, update, { new: true });
        return res;
    },

    deleteContactChat: async (query) => {
        return await Chat.findByIdAndDelete(query);
    },

    createNewMessage: async (data) => {
        try {
            const saveData = {
                ...data,
            };

            const newMessage = new Message(saveData);
            const result = await newMessage.save();

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    getMessages: async (query, filter = { }) => {
        return await Message.find(query, filter)
            .populate("sender", ["name", "image", "user"])
            .populate("chatId");
    },
};
