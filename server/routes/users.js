var express = require('express');
var router = express.Router();
const { register, login, loginfb, getAllUser, loginOath2 } = require('../controllers/userController')

router.get('/', getAllUser)
router.post('/register', register)
router.post('/login', login)
router.post('/loginfb', loginfb)
router.post('/loginoauth2', loginOath2)

module.exports = router;