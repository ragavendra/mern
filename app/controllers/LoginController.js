// Controller for Login
import login from '../models/loginModel.js'
import { EncodeToken } from '../utility/tokenUtility.js';


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
export const create = async (req, res) => {
    try {
        // Your Code Here
        const { username, password } = req.body;
        await login.create({ username, password });
        return res.json({ message: 'User created successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

// login
export const login_ = async (req, res) => {

    try {
        // Your Code Here
        const { username, password } = req.body;
        // fetch user by their creds dirretly - todo
        const user = await login.findOne({ username, password });
        let token;

        if(user) {
            // generate token
            token = EncodeToken(username, password);

            /*

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
            });*/
        }
        else {
            /*
            req.session.error = 'Authentication failed, please check your '
                + ' username and password.'
                + ' (use "tj" and "foobar")';
            res.redirect('/login');*/

            return res.status(401).json({ message: 'Invalid creds' });
        }

        // await login .login({ username, password });
        return res.json({ message: 'User logged in successfully', token: token });
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
export const showAll = async (req, res) => {
    try {
        // Your Code Here
        // feth all users
        const users = await login.find({ });

        return res.json({ data: 'Retrieve item logic goes here', users: users });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

export const update = async (req, res) => {
    try {
        // Your Code Here
        return res.json({ message: 'Item updated successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};

export const destroy = async (req, res) => {
    try {
        // Your Code Here
        return res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        return res.json({ error: error.message || 'Internal Server Error' });
    }
};
