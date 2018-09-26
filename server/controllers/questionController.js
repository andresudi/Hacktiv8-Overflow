const Question = require("../models/question");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createQuestion = (req, res) => {
  const { title, description } = req.body;
  let loggedInUser = req.loggedInUser;

  Question.create({
    title: title,
    description: description,
    userId: loggedInUser.id,
  })
    .then(data_question => {
      res.status(201).json({
        message: `Question Successfully Created!`,
        data: data_question
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `Internal Server Error!`
      });
    });
};

const getAllQuestion = (req, res) => {
  Question.find({})
    .populate("userId")
    .populate("answerId")
    .sort({createdAt: 'desc'})
    .then(data_questions => {
      res.status(200).json({
        message: `Success get all questions list`,
        data: data_questions
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `Internal Server Error!`
      });
    });
};

const getOneQuestion = (req, res) => {
  Question.findOne({
    _id: req.params.id
  })
    .populate("userId")
    .populate("answerId")
    .then(data_question => {
      res.status(200).json({
        message: `Successfully get a question with id ${data_question._id}`,
        data: data_question
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getMyQuestions = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;

  Question.find({
    userId: req.loggedInUser._id
  })
    .populate("userId")
    .populate("answerId")
    .sort({ createdAt: "desc" })
    .then(data_question => {
      res.status(200).json({
        message: "List of my questions",
        data: data_question
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const updateQuestion = (req, res) => {
  const { title, description } = req.body;
  let token = req.headers.token;

  Question.findOne({
    _id: req.params.id
  })
    .then(data_question => {
      if (data_question) {
        if (String(data_question.userId) == String(req.loggedInUser._id)) {
          const dataUpdate = {};
          if (title) dataUpdate.title = title;
          if (description) dataUpdate.description = description;
          Question.updateOne(
            {
              _id: req.params.id
            },
            dataUpdate
          )
            .then(() => {
              res.status(200).json({
                message: "Success update specific question"
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err.message
              });
            });
        } else {
          res.status(400).json({
            message: `You don't have access to update this question!`
          });
        }
      } else {
        res.status(400).json({
          message: `Data not found!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const deleteQuestion = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Question.findOne({
    _id: req.params.id
  })
    .then(data_question => {
      if (data_question) {
        if (String(data_question.userId) == String(loggedInUser._id)) {
          Question.deleteOne({
            _id: req.params.id
          })
            .then(() => {
              res.status(200).json({
                message: "Success delete question"
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err.message
              });
            });
        } else {
          res.status(400).json({
            message: `You don't have access to delete this question!`
          });
        }
      } else {
        res.status(400).json({
          message: `Data not found!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const likeQuestion = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Question.findOne({
    _id: req.params.id
  })
    .then(data_question => {
      if (data_question) {
        if (String(data_question.userId) == String(loggedInUser._id)) {
          res.status(400).json({
            message: `you cannot like your own question!`
          });
        } else {
          let status = false;          
          for (let i = 0; i < data_question.likes.length; i++) {
            if (data_question.likes[i].userId == loggedInUser._id) {
              status = true;
            }
          }
          if (status == true) {
            res.status(400).json({
              message: `You already like this question!`
            });
          } else {
            Question.updateOne(
              {
                _id: req.params.id
              },
              {
                $push: { likes: { userId: loggedInUser.id } },
                $pull: { dislikes: { userId: loggedInUser.id} }
              },
            )
              .then(result => {
                res.status(201).json({
                  message: `Like++`
                });
              })
              .catch(err => {
                res.status(400).json({
                  message: err.message
                });
              });
          }
        }
      } else {
        res.status(400).json({
          message: `Data not found!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const dislikeQuestion = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Question.findOne({
    _id: req.params.id
  }) 
    .then(data_question => {
      if (data_question) {
        if (String(data_question.userId) == String(loggedInUser._id)) {
          res.status(400).json({
            message: `you cannot dislike your own question!`
          });
        } else {
          let status = false;
          for (let i = 0; i < data_question.dislikes.length; i++) {
            if (String(data_question.dislikes[i].userId) == String(loggedInUser._id)) {
              status = true;
            }
          }
          if (status == true) {
            res.status(400).json({
              message: `You already disllike this question!`
            });
          } else {
            Question.updateOne(
              {
                _id: req.params.id
              },
              {
                $push: { dislikes: { userId: loggedInUser.id } },
                $pull: { likes: { userId: loggedInUser.id} }
              }
            )
              .then(result => {
                res.status(201).json({
                  message: `Dislike++`
                });
              })
              .catch(err => {
                res.status(400).json({
                  message: err.message
                });
              });
          }
        }
      } else {
        res.status(400).json({
          message: `Data not found!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  createQuestion,
  getAllQuestion,
  getOneQuestion,
  deleteQuestion,
  getMyQuestions,
  updateQuestion,
  likeQuestion,
  dislikeQuestion
};
