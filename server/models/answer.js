const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  questionId: { type:String, ref: 'Question' },
  userId: { type:String, ref: 'User' },
  comment: { type:String },
  like: [],
  dislike: []
},{
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;