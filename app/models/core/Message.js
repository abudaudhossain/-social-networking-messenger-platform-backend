const mongoose = require("mongoose");

const field = {
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    sender: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppProfile",
        required: [true, "Profile Id is Required"],
    },
    chatId: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppChat",
    },
    status: {
        // true false
        type: Boolean,
        default: true,
    },
};

const appMessageSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppMessage", appMessageSchema);
