const mongoose = require("mongoose");

const field = {
    username: {
        type: String,
        trim: true,
        required: [true, "User name is required"],
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: [true, "User account password is required"],
    },

    user: {
        // @relation
        type: mongoose.Types.ObjectId,
        ref: "AppProfile",
    },

    existence: {
        // true false
        type: Boolean,
        default: true,
    },
    status: {
        type: Boolean,
        default: true,
    },

    logAt: {
        type: Date,
    },

    tokens: [String],
};

const appUserSchema = mongoose.Schema(field, { timestamps: true });

module.exports = mongoose.model("AppUser", appUserSchema);

//   role: {
//     //  employee admin
//     type: String,
//     required: [true, "User role is required"],
//     enum: {
//       values: ["admin", "employee", "visitor"],
//       message: "User role value can't be {VALUE}, must be admin/employee",
//     },
//   },
