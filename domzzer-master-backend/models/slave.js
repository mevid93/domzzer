const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const slaveSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'field length must be at least 3 characters!'],
    required: [true, 'field is required!'],
    unique: true
  },
  address: {
    type: String,
    minlength: [10, 'field length must be at least 10 characters!'],
    required: [true, 'field is required!'],
    unique: true
  },
  status: {
    type: String,
    minlength: [5, 'field length must be at least 5 characters!'],
    required: [true, 'field is required!']
  },
  testsDone: {
    type: Number,
    minimum: [0, 'field value must be at least 0!'],
    required: [true, 'field is required!']
  },
  vulnerabilitiesFound: {
    type: Number,
    minimum: [0, 'field value must be at least 0!'],
    required: [true, 'field is required!']
  },
  username: {
    type: String,
    minlength: [5, 'field length must be at least 5 characters!'],
    required: [function () { return this.password !== undefined }, 'field is required when password is defined!']
  },
  password: {
    type: String,
    minlength: [8, 'field length must be at least 8 characters!'],
    required: [function () { return this.username !== undefined }, 'field is required when username is defined!']
  }
})
slaveSchema.plugin(uniqueValidator, { message: 'field must be unique!' })

slaveSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Slave', slaveSchema)