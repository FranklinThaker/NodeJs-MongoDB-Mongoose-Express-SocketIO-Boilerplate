const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const userValidator = require('./user.validator');

const {
  authentication,
  authorization,
} = require('../../middleware/middleware');

router.post('/register', userValidator.registerValidator, userController.register);
router.post('/login', userValidator.loginValidator, userController.login);
router.get('/profile', authentication, authorization, userController.profile);
router.get('/users', authentication, authorization, userController.getAll);
router.get('/users/:userId', authentication, authorization, userController.findById);
router.delete('/users/:userId', authentication, authorization, userController.deleteById);

module.exports = router;
