const { ObjectId } = require('bson')
const {Schema, model} = require('mongoose')

const user = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  userInfoId: {
    type: ObjectId,
    required: true,
    unique: true,
    ref: 'UserInfo'
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = model('User', user)