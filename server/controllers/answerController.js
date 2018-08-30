const Answer = require('../models/answer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createAnswer = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Answer.create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        userId: decode.id
    })
        .then((result) => {
            res.status(201).json({
                message: `Answer Created!`,
                data: result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const getAllAnswer = (req, res) => {
    Answer.find({
        questionId: req.params.question
    })
        .populate('userId')
        .then((result) => {
            res.status(200).json({
                message: `Success get All Answer with questionId ${result._id}`,
                data: result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const getOneAnswer = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Answer.findOne({
        _id: req.params.id,
        userId: decode.id
    })
        .then((result) => {
            res.status(200).json({
                message: `Success get answer with id ${req.params.id}`,
                data: result
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const updateAnswer = (req, res) => {
    const { answer } = req.body
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Answer.findOne({
        _id: req.params.id
    })
        .then((result) => {
            if (result.userId == decode.id) {
                Answer.update({
                    _id: req.params.id,
                    userId: decode.id
                }, {
                        answer: answer
                    })
                    .then((result) => {
                        res.status(201).json({
                            message: `answer successfully updated`
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
                    message: `You cant Edit People's Answer!`
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
}

const likeAnswer = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Answer.findOne({
        _id: req.params.id
    })
        .then((data_answers) => {
            if (data_answers.userId == decode.id) {
                res.status(200).json({
                    message: `tidak boleh vote diri sendiri!`
                })
            }
            else {
                let status = false
                for (let i = 0; i < data_answers.like.length; i++) {
                    if (data_answers.like[i].userId == decode.id) {
                        status = true
                    }
                }
                if (status === true) {
                    res.status(200).json({
                        message: `You Already Like this Answer`
                    })
                }
                else {
                    Answer.updateOne({
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

const dislikeAnswer = (req, res) => {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.jwt_secret)
    Answer.findOne({
        _id: req.params.id
    })
        .then((data_answers) => {
            if (data_answers.userId == decode.id) {
                res.status(200).json({
                    message: `tidak boleh vote diri sendiri!`
                })
            }
            else {
                let status = false
                for (let i = 0; i < data_answers.dislike.length; i++) {
                    if (data_answers.dislike[i].userId == decode.id) {
                        status = true
                    }
                }
                if (status === true) {
                    res.status(200).json({
                        message: `You Already Dislike this Answer`
                    })
                }
                else {
                    Answer.updateOne({
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
    createAnswer,
    getAllAnswer,
    getOneAnswer,
    updateAnswer,
    likeAnswer,
    dislikeAnswer
}