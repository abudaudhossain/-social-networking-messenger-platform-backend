const mongoose = require("mongoose");

const field = {
    name: {
        type: String,
        trim: true,
        required: [true, "User name is required"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "AppUser",
        required: [true, "User Id is Required"],
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: [true, "Name must be unique"],
    },
    phone: {
        type: String,
    },

    image: {
        type: String,
        default: null,
    },
    socialMediaAccounts: [
        {
            name: {
                type: String,
            },
            link: {
                type: String,
            },
        },
    ],

    connections: [
        {
            // @relation
            type: mongoose.Types.ObjectId,
            ref: "AppProfile",
        },
    ],

    existence: {
        // true false
        type: Boolean,
        default: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
};

const appProfileSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppProfile", appProfileSchema);
