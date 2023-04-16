const mongoose = require("mongoose");

const field = {
    members: [
        {
            // @relation
            type: mongoose.Types.ObjectId,
            ref: "AppProfile",
            required: [true, "Profile Id is Required"],
        },
    ],
    status: {
        // true false
        type: Boolean,
        default: true,
    },
};

const appChatSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppChat", appChatSchema);
