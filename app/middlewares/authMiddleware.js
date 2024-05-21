import {DecodeToken} from "../utility/tokenUtility.js";

function AuthMiddleWare (req, res, next) {
//    if(req) {
    // console.log("Token " + req?.method);

    // Receive Token
    // let token = req.headers['token'];
    // let token = req.headers['Authorization'];
    // let token = req?.get('token');

    // token = token && token.split('')[1];

    // Token Decode
    let decoded = DecodeToken(req.cookies?.user_token);

    // Request Header Email+UserID Add
    if (decoded === null) {
        // return res?.status(401).json({ status: "fail", message: "Unauthorized" });

        console.log("Invalid token - redirect to login page");

        // return res?.redirect('back');
        // return res?.redirect('/login');
        res?.status(401).json({ status: "fail", message: "Unauthorized" });
        // return res.redirect(301, '../login');
        // next();
    } else {
        /*
        let email = decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email = email;
        req.headers.user_id = user_id;*/
        // console.log("User " + user_id + ", Pass " + email);
        req.headers.user = decoded['user'];
        console.log("User " + decoded['user'] + " is authenticated!");
        next();
    }
// }
};

export default AuthMiddleWare;
