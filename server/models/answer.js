const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: [true, "answer is required"]
    },
    questionId: { type: String, ref: "Question" },
    userId: { type: String, ref: "User" },
    likes: [],
    dislikes: []
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
