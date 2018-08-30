const Question = require('../models/question')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createQuestion = (req, res) => {
    const { title, description } = req.body
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)

    Question.create({
        title: title,
        description: description,
        userId: decode.id
    })
        .then((data_question) => {
            res.status(201).json({
                message: `Question Successfully Created!`,
                data: data_question
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: `Internal Server Error!`
            })
        });
}

const getAllQuestion = (req, res) => {
    Question.find()
        .then((data_questions) => {
            res.status(200).json({
                message: `Success get all questions list`,
                data: data_questions
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: `Internal Server Error!`
            })
        });
}

const getOneQuestion = (req, res) => {
    let id = req.params.id

    Question.findOne({
        _id: id
    })
        .then((data_question) => {
            res.status(200).json({
                message: `Successfully get a question with id ${data_question._id}`,
                data: data_question
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const deleteQuestion = (req, res) => {
    let id = req.params.id
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)

    Question.findOne({
        _id: id
    })
        .then((result) => {
            if (result.userId == decode.id) {
                Question.deleteOne({
                    _id: id
                })
                    .then(() => {
                        res.status(201).json({
                            message: `Question Succesfully Deleted!`
                        })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
            }
            else {
                res.status(200).json({
                    message: `Can't Delete People Question!`
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const getMyQuestions = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)

    Question.find({
        userId: decode.id
    })
        .then((questions) => {
            if (questions.length == 0) {
                res.status(200).json({
                    message: `Success get all my questions`,
                    data: []
                })
            } else {
                res.status(200).json({
                    message: `Success get all my questions`,
                    data: questions
                })
            }
        }).catch((err) => {
            res.status(400).json({
                message: `Internal server Error`
            })
        });
}

const updateQuestion = (req, res) => {
    const { title, description } = req.body
    let id = req.params.id
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)

    Question.findOne({
        _id: id
    })
        .then((result) => {
            if (result.userId == decode.id) {
                Question.updateOne({
                    _id: id,
                    userId: decode.id
                }, {
                        title: title,
                        description: description
                    })
                    .then(() => {
                        res.status(201).json({
                            message: `Successfully update a Question`,
                        })
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: err.message
                        })
                    });
            }
            else {
                res.status(400).json({
                    message: err.message
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const likeQuestion = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Question.findOne({
        _id: req.params.id
    })
        .then((data_question) => {
            if (data_question.userId == decode.id) {
                res.status(200).json({
                    message: `tidak boleh vote diri sendiri!`
                })
            }
            else {
                let status = false
                for (let i = 0; i < data_question.like.length; i++) {
                    if (data_question.like[i].userId == decode.id) {
                        status = true
                    }
                }
                if (status === true) {
                    res.status(200).json({
                        message: `You Already Like this Answer`
                    })
                }
                else {
                    Question.updateOne({
                        _id: req.params.id
                    }, {
                            $push: { like: { userId: decode.id } }
                        })
                        .then((result) => {
                            res.status(201).json({
                                message: `Like++`
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                message: err.message
                            })
                        });
                }
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const dislikeQuestion = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Question.findOne({
        _id: req.params.id
    })
        .then((data_question) => {
            if (data_question.userId == decode.id) {
                res.status(200).json({
                    message: `tidak boleh vote diri sendiri!`
                })
            }
            else {
                let status = false
                for (let i = 0; i < data_question.dislike.length; i++) {
                    if (data_question.dislike[i].userId == decode.id) {
                        status = true
                    }
                }
                if (status === true) {
                    res.status(200).json({
                        message: `You Already Dislike this Answer`
                    })
                }
                else {
                    Question.updateOne({
                        _id: req.params.id
                    }, {
                            $push: { dislike: { userId: decode.id } }
                        })
                        .then((result) => {
                            res.status(201).json({
                                message: `Dislike++`
                            })
                        })
                        .catch((err) => {
                            res.status(400).json({
                                message: err.message
                            })
                        });
                }
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}


module.exports = {
    createQuestion,
    getAllQuestion,
    getOneQuestion,
    deleteQuestion,
    getMyQuestions,
    updateQuestion,
    likeQuestion,
    dislikeQuestion
}