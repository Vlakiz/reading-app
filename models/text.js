const {Schema, model} = require('mongoose')

const text = new Schema({
  content: {

  },
  difficulty: {

  },
  created_at: {

  },
  changed_at: {
    
  }
})

module.exports = model('Text', text)