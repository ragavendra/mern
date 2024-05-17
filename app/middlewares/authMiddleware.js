import {DecodeToken} from "../utility/tokenUtility.js";

function AuthMiddleWare (req, res, next) {
//    if(req) {
    // console.log("Token " + req?.method);

    // Receive Token
    // let token = req.headers['token'];
    let token = req?.get('token');


    // Token Decode
    let decoded = DecodeToken(token);
    // Request Header Email+UserID Add
    if (decoded === null) {
        return res?.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
        /*
        let email = decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;*/
        let email = decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;
        // console.log("User " + user_id + ", Pass " + email);
        console.log("User " + email + " is authenticated!");
        next();
    }
// }
};

export default AuthMiddleWare;
