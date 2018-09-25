const router = require('express').Router()
const { isLogin } = require('../middlewares/isLogin')
const { 
    createAnswer, 
    getAllAnswerInQuestion, 
    getOneAnswer, 
    updateAnswer, 
    likeAnswer, 
    dislikeAnswer } = require('../controllers/answerController')

router.post('/:question', isLogin, createAnswer)
router.get('/:question', getAllAnswerInQuestion)
router.get('/one/:id', getOneAnswer)
router.put('/:id', isLogin, updateAnswer)
router.put('/like/:id', isLogin, likeAnswer)
router.put('/dislike/:id', isLogin, dislikeAnswer)

module.exports = router