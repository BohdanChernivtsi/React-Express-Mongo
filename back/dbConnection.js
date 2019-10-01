const mongoose = require('mongoose')
const answerModel = require('./models/questionAnswer')
const nameModel = require('./models/questionName')

const QuestionAnswer = answerModel.QuestionAnswer
const QuestionName = nameModel.QuestionName

mongoose.set('useCreateIndex', true);
const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};
const models = { QuestionAnswer, QuestionName };
exports.connectDb = connectDb;
exports.models = models;