'use strict'

import express from 'express';
import mongoose from 'mongoose';
import router from './routes/api.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {MAX_JSON_SIZE, MONGODB_CONNECTION, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE} from "./app/config/config.js";
import AuthMiddleware from './app/middlewares/authMiddleware.js';

import hash from 'pbkdf2-password'
import path from 'path';
import session from 'express-session'

// var hash = require('pbkdf2-password')()
// var path = require('path');
// var session = require('express-session');
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

// Session-persisted message middleware

app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(AuthMiddleware);
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({extended: URL_ENCODED}));
const limiter = rateLimit({ windowMs: REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER });
app.use(limiter);


// Web cache validation and conditional requests in Http
app.set('etag', WEB_CACHE);



// MongoDB connection
mongoose.connect(MONGODB_CONNECTION, {autoIndex: true})
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
});

/*
var users = {
    tj: { name: 'tj' }
};

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
    if (err) throw err;

    // store the salt & hash in the "db"
    users.tj.salt = salt;
    users.tj.hash = hash;
});

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(null, null)
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user)
        fn(null, null)
    });
}

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/login_');
    }
}

app.get('/', function (req, res) {
    res.redirect('/login_');
});

app.get('/restricted', restrict, function (req, res) {
    res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function () {
        res.redirect('/');
    });
});

app.post('/login_', function (req, res, next) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) return next(err)
        if (user) {
            // Regenerate session when signing in
            // to prevent fixation
            req.session.regenerate(function () {
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.name
                    + ' click to <a href="/logout">logout</a>. '
                    + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('back');
            });
        } else {
            req.session.error = 'Authentication failed, please check your '
                + ' username and password.'
                + ' (use "tj" and "foobar")';
            res.redirect('/login_');
        }
    });
});
*/

// API routes
app.use("/api", router);

// Serve static assets for React front end
app.use(express.static('dist'));

console.log("Dir is " + __dirname ?? "dir");



// Serve React front end for all routes not handled by the API
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'app.html'));
});

app.listen(PORT,()=>{
    console.log(`MERN-X Server Running ${PORT}`)
});
