const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: [4, 'field length must be at least 4 characters!'],
    required: [true, 'field is required!'],
    unique: true,
  },
  userRole: {
    type: String,
    enum: ['LITE', 'PRO', 'ADMIN'],
    default: 'LITE',
    required: [true, 'field is required!']
  },
  passwordHash: {
    type: String,
    required: [true, 'field is required!']
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})
userSchema.plugin(uniqueValidator, { message: 'field must be unique!' })

const User = mongoose.model('User', userSchema)

module.exports = User