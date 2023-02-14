const express = require('express');
const usersController = require('../controllers/usersController')
const verifyToken = require('../middlewares/auth')

const router = express.Router();

router
    .route('/login')
    .get(verifyToken, usersController.logged)
    .post(usersController.login)

router.post('/register', usersController.register)

module.exports = router;