const router = require('express').Router()
const { isLogin } = require('../middlewares/isLogin')
const { 
    createQuestion, 
    getAllQuestion, 
    getOneQuestion, 
    deleteQuestion, 
    getMyQuestions, 
    updateQuestion, 
    likeQuestion, 
    dislikeQuestion } = require('../controllers/questionController')

router.post('/', isLogin, createQuestion)
router.get('/', getAllQuestion)
router.get('/me',isLogin, getMyQuestions)
router.get('/:id', getOneQuestion)
router.put('/:id', isLogin, updateQuestion)
router.delete('/:id', isLogin, deleteQuestion)
router.put('/like/:id', likeQuestion)
router.put('/dislike/:id', dislikeQuestion)

module.exports = router