const {Schema, model} = require('mongoose')

const userInfo = new Schema({
  nom: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  achievements: {
    type: Array,
    default: []
  },
  texts: {
    type: Array,
    default: []
  },
  words: {
    type: Array,
    default: []
  },
  exp: {
    type: Number,
    default: 0
  }
})

module.exports = model('UserInfo', userInfo)