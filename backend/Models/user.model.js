const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    githubId: { type: String },
    role: { type: String, default: "none" },
});

module.exports = mongoose.model("User", UserSchema);
