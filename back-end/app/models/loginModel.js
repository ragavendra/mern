const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        salt: { type: String },
        hash: { type: String }
    },
    { timestamps: true, versionKey: false }
);

const login = mongoose.model('login', loginSchema);
module.exports = login;
