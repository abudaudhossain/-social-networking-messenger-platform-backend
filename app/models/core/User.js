const mongoose = require("mongoose");

const field = {
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
    },

    // common field
    status: {
        // true or false
        type: Boolean,
    },
    existence: {
        // true and false
        type: Boolean,
    },
    createdBy: {
        // @relation
        type: String,
    },
    activityToken: {
        // @relation
        type: String,
    },
};

const appUserSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppUser", appUserSchema);
