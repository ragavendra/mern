import jwt from 'jsonwebtoken';
import {JWT_EXPIRATION_TIME, JWT_SECRET} from "../config/config.js";

export const EncodeToken = (email) => {
    return jwt.sign(email, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

export const DecodeToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error("Invalid token " + JSON.stringify(error));
        return null;
    }
};

export const expireToken = ( data ) => {

    // backdate existing token by 30s
    data.iat = Math.floor(Date.now() / 1000) - 30;

    return jwt.sign(data, JWT_SECRET);
}
