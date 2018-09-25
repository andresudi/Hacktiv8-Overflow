var express = require('express');
var router = express.Router();
const { register, login, loginfb, getAllUser } = require('../controllers/userController')

router.get('/', getAllUser)
router.post('/register', register)
router.post('/login', login)
router.post('/loginfb', loginfb)

module.exports = router;