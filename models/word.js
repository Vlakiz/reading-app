const {Schema, model} = require('mongoose')

const word = new Schema({
  content: {

  },
  syllablesCount: {

  },
  lettersCount: {

  },
  difficulty: {
    
  }
})

module.exports = model('Word', word)