const messagesRes = (messages) => {
    const newMessages = [];
    for (let i = 0; i < messages.length; i++) {
        let message = messages[i];
        let { _id, text, image, createdAt, status, sender } = message;
        let { name } = sender;

        let resObj = {
            messageID: _id,
            message: text,
            messageImage: image ? image : null,
            senderName: name ? name : null,
            senderId: sender._id,
            senderImage: sender.image ? sender.image : null,
            messageSendTime: createdAt,
            status
        };

        newMessages.push(resObj);
    }

    return newMessages;
};

module.exports ={
    messagesRes
}