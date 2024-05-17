import express from 'express';
const router = express.Router();
import * as todoController from '../app/controllers/todoController.js';
import * as loginController from '../app/controllers/LoginController.js'

router.post('/store', todoController.store);
router.get('/show', todoController.show);
router.delete('/destroy/:id', todoController.destroy);

router.post('/login', loginController.login_);
router.get('/showAll', loginController.showAll);
router.post('/signup', loginController.create);

export default router;
