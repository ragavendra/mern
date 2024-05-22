'use strict'

/*
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/api.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import fs from 'fs';
import cookieParser from "cookie-parser";
import {MAX_JSON_SIZE, MONGODB_CONNECTION, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE} from "./app/config/config.js";
import AuthMiddleware from './app/middlewares/authMiddleware.js';
import session from 'express-session'*/

const express = require('express');
const mongoose = require('mongoose');
const { router } = require('./routes/api.js');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const fs = require('fs');
const { MAX_JSON_SIZE, MONGODB_CONNECTION, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE } = require('./app/config/config.js');
const AuthMiddleWare = require('./app/middlewares/authMiddleware.js');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

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
// app.use("^(?!.*(login|green))", AuthMiddleware);
// app.use("/api/login", login_)
// app.use("/api/signup", create)
app.use(["/api/show", "/api/one", "/api/store1"], AuthMiddleWare);
// app.use("/api/show", AuthMiddleWare);
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

// API routes
app.use("/api", router);

app.get('/api/file', (req, res, next) => {
    fs.readFile('/file-does-not-exist', (err, data) => {
        if (err) {
            next(err) // Pass errors to Express.
        } else {
            res.send(data)
        }
    })
})

// Access the session as req.session
app.get('/session', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

// console.log("Dir is " + __dirname ?? "dir");

// last lines of the file
// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
router.use(function (req, res) {
  res.status(404);
  res.send({ error: "Sorry, can't find that" })
});

app.listen(PORT,()=>{
    console.log(`Back end running on ${PORT}`)
});
