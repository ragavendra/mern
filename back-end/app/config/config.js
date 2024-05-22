const MONGODB_CONNECTION = "mongodb+srv://mrrabbil:mernx123@cluster0.rtpbcy6.mongodb.net/app_todo?retryWrites=true&w=majority";

const JWT_SECRET = "5EC7CEFA1BE7C9354A639369A2AA8";
const JWT_EXPIRATION_TIME = 60 * 60 * 24 * 1; // 1 Day

const EMAIL_HOST = "";
const EMAIL_PORT = "";
const EMAIL_USER = "";
const EMAIL_PASSWORD = "";

const MAX_JSON_SIZE = "50mb";
const URL_ENCODED = true;

const REQUEST_LIMIT_TIME = 15 * 60 * 1000; // 15 Min
const REQUEST_LIMIT_NUMBER = 3000; // Per 15 Min 3000 Request Allowed

const WEB_CACHE=false;

const PORT=3000;

module.exports = { MONGODB_CONNECTION, JWT_SECRET, JWT_EXPIRATION_TIME, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, MAX_JSON_SIZE,
  URL_ENCODED, REQUEST_LIMIT_TIME, REQUEST_LIMIT_NUMBER, WEB_CACHE, PORT }
