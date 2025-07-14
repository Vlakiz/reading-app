const {Schema, model} = require('mongoose')

const achievement = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  }
})

module.exports = model('Achievement', achievement)