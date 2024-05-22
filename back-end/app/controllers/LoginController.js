// Controller for Login
const login = require('../models/loginModel.js');
const { DecodeToken, EncodeToken, expireToken } = require('../utility/tokenUtility.js');
const { genSalt, hash, compare } = require('bcryptjs');

// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    // var user = users[name];
    const user = login.findOne({ username });

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

// register user
const create = async (req, res) => {
    try {
        // Your Code Here
        console.log("Creds " + JSON.stringify(req?.body));

        const { username, password } = req.body;

        genSalt(10, function (err, salt) {
            hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                login.create({ username, salt, hash }).then(() => { res.json({ message: 'User created successfully' }); })
            });
        });

        /*
        hash({ password: password }, function (err, pass, salt, hash) {
            if (err) throw err;

            login.create({ username, salt, hash }).then(() => { res.json({ message: 'User created successfully' }); })
        });*/

        // await login.create({ username, password });
        // return res.json({ message: 'User created successfully' });
    } catch (error) {
        // return
        res.status(501).json({ error: error.message || 'Internal Server Error' });
    }
};

// login
const login_ = (req, resp) => {

    // Your Code Here
    const { username, password } = req.body;

    // fetch user by their creds dirretly - todo
    login.findOne({ username }).then(user => {
        let token;

        if (user) {

            compare(password, user.hash, (err, res) => {

                if (err)
                    console.error("Error is " + err.message);

                if (res) {

                    // generate token
                    token = EncodeToken({ user: username });

                    // Regenerate session when signing in
                    // to prevent fixation
                    req.session.regenerate(function () {
                        // Store the user's primary key
                        // in the session store to be retrieved,
                        // or in this case the entire user object
                        req.session.user = user;
                        /*
                        req.session.success = 'Authenticated as ' + user.name
                            + ' click to <a href="/logout">logout</a>. '
                            + ' You may now access <a href="/restricted">/restricted</a>.';
                            */

                        resp.json({ message: 'User logged in successfully', token: token });
                        // res.redirect('/list');
                    });
                }
                else {
                    resp.status(401).json({ message: 'Invalid user', token: token });
                    // res.redirect('/login');
                }
            });

        }
        else {
            /*
            req.session.error = 'Authentication failed, please check your '
                + ' username and password.'
                + ' (use "tj" and "foobar")';*/
            res.redirect('/login');

            // return res.status(401).json({ message: 'Invalid creds' });
        }
    });

    // await login .login({ username, password });
    // return res.json({ message: 'User logged in successfully', token: token });
};

// logout
const logout = (req, res) => {

    try {
        // Your Code Here
        const { user } = DecodeToken(req.cookies.user_token);

        // check if user exists
        login.findOne({ user }).then( usr => {

            // make sure, the same token was back dated
            if (req.cookies.user_token === expireToken({ user: user }))
            {
                console.log(`User ${user} logged out!`);
            }

        })

        return res.json({ message: 'User logged out successfully!', token: token });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }

    /*
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
    });*/
};

// list users
const showAll = async (req, res) => {
    try {
        // Your Code Here
        // feth all users
        const users = await login.find({ });

        return res.json({ data: 'Retrieve item logic goes here', users: users });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

const update = async (req, res) => {
    try {
        // Your Code Here
        return res.json({ message: 'Item updated successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

const destroy = async (req, res) => {
    try {
        // Your Code Here
        return res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = { create, login_, logout, showAll, update, destroy };
