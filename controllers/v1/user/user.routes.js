const express = require('express');

const router = express.Router();

const userController = require('./user.controller');
const userValidator = require('./user.validator');

const { authentication, authorization } = require('../../../middleware/middleware');

router.get('', authentication, authorization, userController.getAll);
router.get('/profile', authentication, authorization, userController.profile);
router.get('/:userId', userValidator.userIdValidator, authentication, authorization, userController.findById);

router.post('', userValidator.registerValidator, userController.register);
router.post('/login', userValidator.loginValidator, userController.login);

router.put('/:userId', userValidator.updateUserValidator, authentication, authorization, userController.findByIdAndUpdate);

router.delete('/:userId', userValidator.userIdValidator, authentication, authorization, userController.deleteById);

module.exports = router;
