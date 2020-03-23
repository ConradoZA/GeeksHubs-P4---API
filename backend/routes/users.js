const router = require('express').Router();
const UserController = require('../controllers/UserController.js');
const { authentication, isAdmin } = require("../middleware/authentication.js")

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/info', authentication, isAdmin, UserController.getInfo);

module.exports = router