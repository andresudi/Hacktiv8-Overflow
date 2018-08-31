const router = require('express').Router()
const { isLogin } = require('../middlewares/isLogin')
const { 
    createAnswer, 
    getAllAnswer, 
    getOneAnswer, 
    updateAnswer, 
    likeAnswer, 
    dislikeAnswer } = require('../controllers/answerController')

router.post('/',isLogin, createAnswer)
router.get('/:question', getAllAnswer)
router.get('/one/:id', getOneAnswer)
router.put('/:id', updateAnswer)
router.put('/like/:id', likeAnswer)
router.put('/dislike/:id', dislikeAnswer)

module.exports = router