const mongoose = require('mongoose')
const UserModelSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
});
const UserModel = mongoose.model('UserModelCols', UserModelSchema);
exports.UserModel = UserModel;