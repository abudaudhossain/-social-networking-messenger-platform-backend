const mongoose = require("mongoose");

const field = {
    post: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppPost",
        required: [true, "Post Id is Required"],
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: null,
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "AppProfile",
        },
    ],

    user: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppProfile",
        required: [true, "Profile Id is Required"],
    },
    createdBy: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppUser",
        required: [true, "User Id is Required"],
    },

    existence: {
        // true false
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        default: "active",
        enum: {
            values: ["active", "inactive"],
            message:
                "User role value can't be {VALUE}, must be active/inactive",
        },
    },
};

const appCommentSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppComment", appCommentSchema);
