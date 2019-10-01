const mongoose = require('mongoose')
const QuestionAnswerSchema = new mongoose.Schema({
  question_id: {
    type: String,
    unique: true,
  },
  answer_number: {
    type: Number,
    unique: true,
  },
});
const QuestionAnswer = mongoose.model('QuestionAnswerCols', QuestionAnswerSchema);
exports.QuestionAnswer = QuestionAnswer;
// exports.QuestionAnswer = mongoose.model('QuestionAnswer', QuestionAnswerSchema);