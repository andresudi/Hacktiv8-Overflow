const Answer = require("../models/answer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAnswer = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;

  Answer.create({
    answer: req.body.answer,
    questionId: req.params.question,
    userId: loggedInUser.id
  })
    .then(result => {
      res.status(201).json({
        message: `Answer Succesfully Created!`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: `Internal Server Error!`
      });
    });
};

const getAllAnswerInQuestion = (req, res) => {
    console.log(req.params);
    
  Answer.find({
    questionId: req.params.question
  })
    .populate("userId")
    .populate("questionId")
    .then(result => {
        console.log(result);
        
      res.status(200).json({
        message: `Success get All Answer with questionId ${req.params.question}`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const getOneAnswer = (req, res) => {
  let token = req.headers.token;
  Answer.findOne({
    _id: req.params.id
    // userId: req.loggedInUser.id
  })
    .populate("userId")
    .then(result => {
      res.status(200).json({
        message: `Success get answer with id ${req.params.id}`,
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const updateAnswer = (req, res) => {
  const { answer } = req.body;
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (String(result.userId) == String(loggedInUser._id)) {
          Answer.update(
            {
              _id: req.params.id,
              userId: req.loggedInUser.id
            },
            {
              answer: answer
            }
          )
            .then(() => {
              res.status(201).json({
                message: `answer successfully updated`
              });
            })
            .catch(err => {
              res.status(400).json({
                message: err.message
              });
            });
        } else {
          res.status(200).json({
            message: `You cannott edit other user's answer!`
          });
        }
      } else {
        res.status(200).json({
          message: `Data Not Found!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const likeAnswer = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (String(result.userId) == String(loggedInUser._id)) {
          res.status(400).json({
            message: `you cannot like your own answer!`
          });
        } else {
          let status = false;
          for (let i = 0; i < result.likes.length; i++) {
            if (result.likes[i].userId == loggedInUser._id) {
              status = true;
            }
          }
          if (status == true) {
            res.status(200).json({
              message: `You already like this answer!`
            });
          } else {
            Answer.updateOne(
              {
                _id: req.params.id
              },
              {
                $push: { likes: { userId: loggedInUser.id } },
                $pull: { dislikes: { userId: loggedInUser.id } }
              }
            )
              .then(result => {
                res.status(201).json({
                  message: `Like++`,
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

const dislikeAnswer = (req, res) => {
  let token = req.headers.token;
  let loggedInUser = req.loggedInUser;
  Answer.findOne({
    _id: req.params.id
  })
    .then(result => {
      if (result) {
        if (String(result.userId) == String(loggedInUser._id)) {
          res.status(400).json({
            message: `you cannot dislike your own answer!`
          });
        } else {
          let status = false;
          for (let i = 0; i < result.dislikes.length; i++) {
            if (String(result.dislikes[i].userId) == String(loggedInUser._id)) {
              status = true;
            }
          }
          if (status == true) {
            res.status(200).json({
              message: `You already disllike this answer!`
            });
          } else {
            Answer.updateOne(
              {
                _id: req.params.id
              },
              {
                $push: { dislikes: { userId: loggedInUser.id } },
                $pull: { likes: { userId: loggedInUser.id } }
              }
            )
              .then(result => {
                res.status(201).json({
                  message: `Dislike++`,
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
  createAnswer,
  getAllAnswerInQuestion,
  getOneAnswer,
  updateAnswer,
  likeAnswer,
  dislikeAnswer
};
