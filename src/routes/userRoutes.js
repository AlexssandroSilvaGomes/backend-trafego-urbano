const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/reset-password', userController.requestPasswordReset);
router.post('/confirm-reset', userController.confirmPasswordReset);

module.exports = router;
