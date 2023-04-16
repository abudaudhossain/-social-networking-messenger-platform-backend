const mongoose = require("mongoose");

const field = {
    description: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    createdBy: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppUser",
        required: [true, "User Id is Required"],
    },
    user: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppProfile",
        required: [true, "Profile Id is Required"],
    },

    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "AppProfile",
        },
    ],
    comments: [
        {
            // @relation
            type: mongoose.Types.ObjectId,
            ref: "AppComment",
        },
    ],
    shares: [
        {
            // @relation
            type: mongoose.Types.ObjectId,
            ref: "AppProfile",
        },
    ],
    sharePost: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppPost",
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

const appPostSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppPost", appPostSchema);
