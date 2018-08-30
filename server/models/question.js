const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: { type:String },
  description: { type:String },
  userId: { type:Schema.Types.ObjectId, ref:'User' },
  likes: [],
  dislikes: [],
},{
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;