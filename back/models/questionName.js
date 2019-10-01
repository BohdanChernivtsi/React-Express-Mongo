const mongoose = require('mongoose')
const QuestionNameSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
  },
  option1: {
    type: String,
    unique: true,
  },
  option2: {
    type: String,
    unique: true,
  },
  option3: {
    type: String,
    unique: true,
  },
  option4: {
    type: String,
    unique: true,
  },
});
const QuestionName = mongoose.model('QuestionNameCols', QuestionNameSchema);
exports.QuestionName = QuestionName