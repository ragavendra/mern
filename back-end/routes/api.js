const express = require('express');
const router = express.Router();
const { store, show, destroy } = require('../app/controllers/todoController.js');
const { logout, showAll, login_, create } = require('../app/controllers/LoginController.js');

router.post('/store', store);
router.get('/show', show);
router.delete('/destroy/:id', destroy);

router.get('/logout', logout);
router.get('/showAll', showAll);
router.post('/login', login_);
router.post('/signup', create);

module.exports = { router };
