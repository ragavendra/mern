import mongoose from 'mongoose';
const loginSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        salt: { type: String },
        hash: { type: String }
    },
    { timestamps: true, versionKey: false }
);

const login = mongoose.model('login', loginSchema);

export default login;
